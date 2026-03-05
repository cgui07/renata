"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export type EventType =
  | "property_view"
  | "property_favorite"
  | "whatsapp_click"
  | "lead_created"

export async function trackEvent(params: {
  type: EventType
  sessionId: string
  propertyId?: string
  propertyName?: string
  metadata?: Record<string, unknown>
}) {
  try {
    await prisma.event.create({
      data: {
        type: params.type,
        sessionId: params.sessionId,
        propertyId: params.propertyId ?? null,
        propertyName: params.propertyName ?? null,
        metadata: params.metadata
          ? (params.metadata as Prisma.InputJsonValue)
          : undefined,
      },
    })
  } catch (err) {
    
    console.error("[trackEvent]", err)
  }
}
