"use client"

import { trackEvent } from "@/app/actions/events"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

interface FavoritesContextValue {
  favorites: Set<string>
  toggle: (id: string, propertyName?: string) => void
  isFavorite: (id: string) => boolean
  count: number
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

const STORAGE_KEY = "renata-imoveis-favorites"

function loadFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveFavorites(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)

  
  useEffect(() => {
    setFavorites(loadFavorites())
    setLoaded(true)
  }, [])

  
  useEffect(() => {
    if (loaded) saveFavorites(favorites)
  }, [favorites, loaded])

  const toggle = useCallback((id: string, propertyName?: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      const adding = !next.has(id)
      if (adding) {
        next.add(id)
        const sessionId = localStorage.getItem("renata-session-id") ?? "unknown"
        trackEvent({ type: "property_favorite", sessionId, propertyId: id, propertyName })
      } else {
        next.delete(id)
      }
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites]
  )

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggle, isFavorite, count: favorites.size }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider")
  }
  return ctx
}
