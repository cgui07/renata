"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/app/actions/events"
import { FormInput } from "@/components/form/FormInput"
import { submitContactLead } from "@/app/actions/contact"
import { useState, useTransition, type ReactNode } from "react"
import { CheckCircle2, Loader2, Phone, Smartphone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

const CONTACT_OPTIONS = [
  { value: "phone", label: "Telefone", icon: Phone },
  { value: "whatsapp", label: "WhatsApp", icon: Smartphone },
] as const

interface ContactModalProps {
  propertyId: string
  propertyName: string
  trigger: ReactNode
  source?: "property" | "favorites" | "favorites_property"
}

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

export function ContactModal({
  propertyId,
  propertyName,
  trigger,
  source = "property",
}: ContactModalProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    contactPref: "whatsapp",
  })
  const [errors, setErrors] = useState<FormErrors>({})

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
        setWhatsappUrl(null)
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
        propertyId,
        propertyName,
        source,
      })
      if (result.success) {
        setWhatsappUrl(result.whatsappUrl ?? null)
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
                Seus dados foram registrados. Clique abaixo para continuar pelo WhatsApp.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2">
              {whatsappUrl && (
                <Button
                  className="w-full gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold"
                  onClick={() => {
                    const sessionId = localStorage.getItem("renata-session-id") ?? "unknown"
                    trackEvent({
                      type: "whatsapp_click",
                      sessionId,
                      propertyId,
                      propertyName,
                      metadata: { source },
                    })
                    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
                    handleOpenChange(false)
                  }}
                >
                  <Smartphone className="size-4" />
                  Abrir WhatsApp
                </Button>
              )}
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
              <DialogTitle>Fale com um corretor</DialogTitle>
              <DialogDescription>
                Preencha seus dados e entraremos em contato sobre{" "}
                <span className="font-medium text-foreground">{propertyName}</span>.
              </DialogDescription>
            </DialogHeader>

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
                  "Entrar em contato"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
