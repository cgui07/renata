"use client"

import { cn } from "@/lib/utils"
import { ROUTES } from "@/constants"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/useFavorites"
import { FormInput } from "@/components/form/FormInput"
import { submitContactLead } from "@/app/actions/contact"
import { useState, useTransition, type ReactNode } from "react"
import { CheckCircle2, Heart, Loader2, Phone, Smartphone } from "lucide-react"
import {
  PRE_LAUNCH_PROPERTIES,
  NEW_PROPERTIES,
  LAUNCHED_PROPERTIES,
  ALL_PROPERTIES,
} from "@/lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

const ALL_PROPS = [
  ...PRE_LAUNCH_PROPERTIES,
  ...NEW_PROPERTIES,
  ...LAUNCHED_PROPERTIES,
  ...ALL_PROPERTIES,
]

const CONTACT_OPTIONS = [
  { value: "phone", label: "Telefone", icon: Phone },
  { value: "whatsapp", label: "WhatsApp", icon: Smartphone },
] as const

interface FormState {
  name: string
  email: string
  phone: string
  contactPref: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = "Nome é obrigatório"
  if (!form.email.trim()) {
    errors.email = "E-mail é obrigatório"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "E-mail inválido"
  }
  if (!form.phone.trim()) errors.phone = "Celular é obrigatório"
  return errors
}

interface FavoritesGateModalProps {
  trigger: ReactNode
}

export function FavoritesGateModal({ trigger }: FavoritesGateModalProps) {
  const router = useRouter()
  const { favorites, count } = useFavorites()
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    contactPref: "whatsapp",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const favoriteItems = ALL_PROPS
    .filter((p) => favorites.has(p.id))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .map((p) => ({ id: p.id, name: p.name }))

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleOpenChange(value: boolean) {
    setOpen(value)
    if (!value) {
      setTimeout(() => {
        setSubmitted(false)
        setServerError(null)
        setForm({ name: "", email: "", phone: "", contactPref: "whatsapp" })
        setErrors({})
      }, 300)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setServerError(null)
    startTransition(async () => {
      const result = await submitContactLead({
        ...form,
        favoriteIds: favoriteItems,
        source: "favorites",
      })
      if (result.success) {
        setSubmitted(true)
      } else {
        setServerError(result.error ?? "Erro desconhecido.")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle2 className="size-14 text-[#25D366]" />
            <div>
              <p className="text-lg font-bold text-foreground">Tudo certo!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Seus dados foram registrados. Clique abaixo para ver seus favoritos.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Button
                className="w-full gap-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
                onClick={() => {
                  handleOpenChange(false)
                  router.push(ROUTES.FAVORITES)
                }}
              >
                <Heart className="size-4" />
                Ver meus favoritos
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={() => handleOpenChange(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Heart className="size-5 text-danger" />
                Ver meus favoritos
              </DialogTitle>
              <DialogDescription>
                {count > 0
                  ? `Você salvou ${count} imóvel${count !== 1 ? "is" : ""}. Deixe seu contato para continuar.`
                  : "Deixe seu contato para ver os imóveis que você salvou."}
              </DialogDescription>
            </DialogHeader>

            {count > 0 && (
              <div className="rounded-lg border border-border/50 bg-neutral-50 px-4 py-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Imóveis salvos
                </p>
                <ul className="flex flex-col gap-1">
                  {favoriteItems.slice(0, 4).map((f) => (
                    <li key={f.id} className="flex items-center gap-2 text-sm text-foreground">
                      <Heart className="size-3 shrink-0 fill-danger text-danger" />
                      {f.name}
                    </li>
                  ))}
                  {favoriteItems.length > 4 && (
                    <li className="text-xs text-muted-foreground pl-5">
                      +{favoriteItems.length - 4} mais
                    </li>
                  )}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <FormInput
                label="Seu nome"
                placeholder="Digite seu nome"
                required
                value={form.name}
                error={errors.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                  label="E-mail"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={form.email}
                  error={errors.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <FormInput
                  label="Celular"
                  type="tel"
                  placeholder="(xx) xxxxx-xxxx"
                  required
                  value={form.phone}
                  error={errors.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">
                  Forma de contato preferida
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CONTACT_OPTIONS.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleChange("contactPref", value)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-xs font-medium transition-all",
                        form.contactPref === value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      <Icon className="size-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {serverError && (
                <p className="text-xs text-danger" role="alert">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="mt-1 w-full gap-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Ver meus favoritos"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
