"use client"

import { useEffect, useRef } from "react"
import { trackEvent } from "@/app/actions/events"

interface TrackViewProps {
  propertyId: string
  propertyName: string
}

export function TrackView({ propertyId, propertyName }: TrackViewProps) {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return

    const sessionId = localStorage.getItem("renata-session-id") ?? "unknown"
    tracked.current = true
    trackEvent({ type: "property_view", sessionId, propertyId, propertyName })
  }, [propertyId, propertyName])

  return null
}
