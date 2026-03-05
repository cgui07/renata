"use client"
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react"

const SESSION_KEY = "renata-session-id"

export function useSessionId(): string {
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    let id = localStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(SESSION_KEY, id)
    }
    setSessionId(id)
  }, [])

  return sessionId
}
