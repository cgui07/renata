"use server"

import { prisma } from "@/lib/prisma"

const CONTACT_PREF_LABELS: Record<string, string> = {
  phone: "Telefone",
  whatsapp: "WhatsApp",
}

export interface FavoriteItem {
  id: string
  name: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  contactPref: string
  propertyId?: string
  propertyName?: string
  favoriteIds?: FavoriteItem[]
  source?: "property" | "favorites" | "favorites_property"
}

export interface ContactActionResult {
  success: boolean
  whatsappUrl?: string
  error?: string
}

export async function submitContactLead(
  data: ContactFormData
): Promise<ContactActionResult> {
  try {
    await prisma.lead.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        contactPref: data.contactPref,
        propertyId: data.propertyId ?? null,
        propertyName: data.propertyName ?? null,
        favoriteIds: data.favoriteIds ? (data.favoriteIds as object[]) : undefined,
        source: data.source ?? "property",
      },
    })

    const number = process.env.WHATSAPP_NUMBER ?? ""
    const prefLabel = CONTACT_PREF_LABELS[data.contactPref] ?? data.contactPref

    const isFavoritesLead = data.favoriteIds && data.favoriteIds.length > 0
    const propertyLines = isFavoritesLead
      ? [
          `🏠 *Imóveis favoritados (${data.favoriteIds!.length}):*`,
          ...data.favoriteIds!.map((f, i) => `  ${i + 1}. ${f.name}`),
        ]
      : [`🏠 *Imóvel:* ${data.propertyName ?? "—"}`]

    const lines = [
      `Olá Renata! Tenho interesse ${isFavoritesLead ? "nos imóveis abaixo" : "no imóvel abaixo"}:`,
      ``,
      ...propertyLines,
      ``,
      `👤 *Nome:* ${data.name.trim()}`,
      `📧 *E-mail:* ${data.email.trim()}`,
      `📱 *Celular:* ${data.phone.trim()}`,
      `💬 *Prefere contato por:* ${prefLabel}`,
    ]
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`

    return { success: true, whatsappUrl }
  } catch (err) {
    console.error("[submitContactLead]", err)
    return { success: false, error: "Erro ao enviar. Tente novamente." }
  }
}
