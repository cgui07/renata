"use server"

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123"
const SESSION_COOKIE = "admin_session"

export async function adminLogin(password: string): Promise<{ success: boolean }> {
  if (password !== ADMIN_PASSWORD) return { success: false }
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, 
  })
  return { success: true }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getLeads(page = 1, status?: string) {
  const PAGE_SIZE = 30
  const where = status && status !== "all" ? { status } : {}
  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.lead.count({ where }),
  ])
  return { leads, total, pages: Math.ceil(total / PAGE_SIZE) }
}

export async function updateLeadStatus(id: string, status: string, notes?: string) {
  await prisma.lead.update({
    where: { id },
    data: { status, ...(notes !== undefined ? { notes } : {}) },
  })
}

export async function getEventStats() {
  const [views, favorites, whatsappClicks, topProperties] = await Promise.all([
    prisma.event.count({ where: { type: "property_view" } }),
    prisma.event.count({ where: { type: "property_favorite" } }),
    prisma.event.count({ where: { type: "whatsapp_click" } }),
    prisma.event.groupBy({
      by: ["propertyId", "propertyName"],
      where: { type: "property_view", propertyId: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
  ])
  return { views, favorites, whatsappClicks, topProperties }
}
