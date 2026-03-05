"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import { ROUTES } from "@/constants"
import { useFavorites } from "@/hooks/useFavorites"
import { FavoritesGateModal } from "@/components/common/FavoritesGateModal"

interface FavoritesLinkProps {
  className?: string
}

const baseClass =
  "relative flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-primary hover:bg-primary/5"

export function FavoritesLink({ className }: FavoritesLinkProps) {
  const { count } = useFavorites()

  const badge = count > 0 && (
    <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-danger text-[0.6rem] font-bold text-white leading-none">
      {count > 99 ? "99+" : count}
    </span>
  )

  if (count > 0) {
    return (
      <FavoritesGateModal
        trigger={
          <button className={cn(baseClass, className)} aria-label={`Favoritos (${count})`}>
            <Heart className="size-4.5" />
            <span className="hidden lg:inline">Favoritos</span>
            {badge}
          </button>
        }
      />
    )
  }

  return (
    <Link href={ROUTES.FAVORITES} className={cn(baseClass, className)} aria-label="Favoritos">
      <Heart className="size-4.5" />
      <span className="hidden lg:inline">Favoritos</span>
    </Link>
  )
}
