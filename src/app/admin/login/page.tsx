"use client"

import { Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { adminLogin } from "@/app/actions/admin"
import { Suspense, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    startTransition(async () => {
      const result = await adminLogin(password)
      if (result.success) {
        router.push(searchParams.get("from") ?? "/admin/leads")
      } else {
        setError("Senha incorreta.")
        setPassword("")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
          required
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full gap-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        Entrar
      </Button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-border/60 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="size-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Painel Admin</h1>
          <p className="text-sm text-muted-foreground">Renata Imóveis</p>
        </div>

        <Suspense fallback={<div className="h-32" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
