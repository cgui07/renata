"use client"

import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites"

interface FavoriteButtonProps {
  propertyId: string
  className?: string
}

export function FavoriteButton({ propertyId, className }: FavoriteButtonProps) {
  const { toggle, isFavorite } = useFavorites()
  const active = isFavorite(propertyId)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(propertyId)
      }}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={cn(
        "flex size-9 items-center justify-center rounded-full transition-all duration-200",
        "bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white hover:scale-110",
        active && "bg-white",
        className
      )}
    >
      <Heart
        className={cn(
          "size-4.5 transition-colors duration-200",
          active
            ? "fill-danger text-danger"
            : "fill-transparent text-neutral-500 hover:text-danger"
        )}
      />
    </button>
  )
}
