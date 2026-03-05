"use client"

import { useState, useTransition } from "react"
import { updateLeadStatus } from "@/app/actions/admin"
import { Heart, Loader2, MessageCircle } from "lucide-react"

const STATUS_LABELS: Record<string, string> = {
  new: "Novo",
  contacted: "Em contato",
  converted: "Convertido",
  lost: "Perdido",
}

const STATUS_OPTIONS = Object.entries(STATUS_LABELS)

const CONTACT_PREF_LABELS: Record<string, string> = {
  phone: "Telefone",
  whatsapp: "WhatsApp",
}

interface FavoriteItem {
  id: string
  name: string
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  contactPref: string
  propertyName: string | null
  status: string
  notes: string | null
  createdAt: Date
  favoriteIds: unknown
  source: "property" | "favorites" | "favorites_property" | string
}

interface LeadsTableProps {
  leads: Lead[]
  statusColors: Record<string, string>
}

export function LeadsTable({ leads, statusColors }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-sm text-muted-foreground">
        Nenhum lead encontrado.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40 bg-neutral-50/50 text-left">
            <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lead</th>
            <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contato</th>
            <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Imóvel / Favoritos</th>
            <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} statusColors={statusColors} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LeadRow({ lead, statusColors }: { lead: Lead; statusColors: Record<string, string> }) {
  const [status, setStatus] = useState(lead.status)
  const [isPending, startTransition] = useTransition()

  const favorites = Array.isArray(lead.favoriteIds)
    ? (lead.favoriteIds as FavoriteItem[])
    : []

  function handleStatusChange(newStatus: string) {
    setStatus(newStatus)
    startTransition(async () => {
      await updateLeadStatus(lead.id, newStatus)
    })
  }

  const propertyForWhatsapp =
    favorites.length > 0
      ? `os imóveis: ${favorites.map((f) => f.name).join(", ")}`
      : lead.propertyName
        ? `o imóvel ${lead.propertyName}`
        : "o imóvel de seu interesse"

  const whatsappUrl = `https://wa.me/55${lead.phone.replace(/\D/g, "")}?text=Olá ${lead.name}, tudo bem? Sou a Renata e entro em contato sobre ${propertyForWhatsapp}.`

  return (
    <tr className="hover:bg-neutral-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground">{lead.name}</p>
          {lead.source === "favorites" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-[0.65rem] font-semibold text-danger">
              <Heart className="size-2.5 fill-danger" />
              Favoritos
            </span>
          ) : lead.source === "favorites_property" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-[0.65rem] font-semibold text-danger">
              <Heart className="size-2.5 fill-danger" />
              Favorito (imóvel)
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
              Imóvel direto
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{lead.email}</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir conversa no WhatsApp"
              className="text-[#1f8f46] underline decoration-1 underline-offset-2 transition-colors hover:text-[#25D366]"
            >
              {lead.phone}
            </a>
            <p className="text-xs text-muted-foreground">
              Prefere: {CONTACT_PREF_LABELS[lead.contactPref] ?? lead.contactPref}
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir WhatsApp"
            className="ml-1 flex size-7 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="size-3.5" />
          </a>
        </div>
      </td>
      <td className="px-6 py-4">
        {favorites.length > 0 ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-danger">
              <Heart className="size-3 fill-danger" />
              {favorites.length} favorito{favorites.length !== 1 ? "s" : ""}
            </div>
            <ul className="flex flex-col gap-0.5">
              {favorites.slice(0, 3).map((f) => (
                <li key={f.id} className="text-xs text-muted-foreground truncate max-w-45">
                  {f.name}
                </li>
              ))}
              {favorites.length > 3 && (
                <li className="text-xs text-muted-foreground">+{favorites.length - 3} mais</li>
              )}
            </ul>
          </div>
        ) : (
          <p className="text-foreground">{lead.propertyName ?? "—"}</p>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isPending}
            className={`rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none cursor-pointer ${statusColors[status] ?? "bg-neutral-100 text-neutral-600"}`}
          >
            {STATUS_OPTIONS.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          {isPending && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
        </div>
      </td>
      <td className="px-6 py-4 text-muted-foreground text-xs">
        {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
    </tr>
  )
}
