import { Suspense } from "react"
import { cookies } from "next/headers"
import { LeadsTable } from "./LeadsTable"
import { redirect } from "next/navigation"
import { getLeads, getEventStats, adminLogout } from "@/app/actions/admin"

export const metadata = { title: "Admin â€” Leads" }

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Em contato" },
  { value: "converted", label: "Convertido" },
  { value: "lost", label: "Perdido" },
]

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  lost: "bg-neutral-100 text-neutral-500",
}

interface PageProps {
  searchParams: Promise<{ page?: string; status?: string }>
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    redirect("/login")
  }

  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)
  const status = params.status ?? "all"

  const [{ leads, total, pages }, stats] = await Promise.all([
    getLeads(page, status),
    getEventStats(),
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-border/60 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">Renata ImÃ³veis</p>
          </div>
          <form action={async () => { "use server"; await adminLogout() }}>
            <button
              type="submit"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Leads total", value: total },
            { label: "VisualizaÃ§Ãµes", value: stats.views },
            { label: "Favoritos", value: stats.favorites },
            { label: "Cliques WhatsApp", value: stats.whatsappClicks },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-border/60 bg-white px-5 py-4"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
              <p className="mt-1 text-3xl font-bold text-primary">{value.toLocaleString("pt-BR")}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <a
              key={opt.value}
              href={`/leads?status=${opt.value}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                status === opt.value
                  ? "border-primary bg-primary text-white"
                  : "border-border/60 bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {opt.label}
            </a>
          ))}
        </div>

        <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
          <div className="border-b border-border/40 px-6 py-4">
            <p className="text-sm font-medium text-foreground">
              {total.toLocaleString("pt-BR")} lead{total !== 1 ? "s" : ""}
              {status !== "all" && ` com status "${STATUS_OPTIONS.find(o => o.value === status)?.label}"`}
            </p>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Carregando...</div>}>
            <LeadsTable leads={leads} statusColors={STATUS_COLORS} />
          </Suspense>

          {pages > 1 && (
            <div className="flex items-center justify-between border-t border-border/40 px-6 py-4">
              <p className="text-sm text-muted-foreground">PÃ¡gina {page} de {pages}</p>
              <div className="flex gap-2">
                {page > 1 && (
                  <a
                    href={`/leads?page=${page - 1}&status=${status}`}
                    className="rounded-md border border-border/60 px-3 py-1.5 text-sm hover:bg-neutral-50"
                  >
                    Anterior
                  </a>
                )}
                {page < pages && (
                  <a
                    href={`/leads?page=${page + 1}&status=${status}`}
                    className="rounded-md border border-border/60 px-3 py-1.5 text-sm hover:bg-neutral-50"
                  >
                    PrÃ³xima
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
