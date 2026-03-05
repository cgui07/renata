"use client"

import { useState } from "react"
import { Building2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyCarouselProps {
  name: string
  /** Número de slides placeholder a gerar */
  slideCount?: number
  className?: string
}

const gradients = [
  "from-secondary/8 via-primary/5 to-accent/10",
  "from-primary/8 via-accent/5 to-secondary/10",
  "from-accent/10 via-secondary/5 to-primary/8",
  "from-secondary/10 via-primary/8 to-accent/5",
  "from-primary/5 via-secondary/8 to-accent/10",
]

export function PropertyCarousel({
  name,
  slideCount = 5,
  className,
}: PropertyCarouselProps) {
  const [current, setCurrent] = useState(0)
  const total = Math.min(slideCount, gradients.length)

  function prev(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setCurrent((c) => (c === 0 ? total - 1 : c - 1))
  }

  function next(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setCurrent((c) => (c === total - 1 ? 0 : c + 1))
  }

  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-neutral-100 group/carousel", className)}>
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              "flex h-full w-full shrink-0 flex-col items-center justify-center gap-2",
              "bg-linear-to-br",
              gradients[i]
            )}
          >
            <Building2 className="size-10 text-neutral-300/80" />
            <span className="text-xs text-neutral-400">
              {name} — Foto {i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Setas de navegação */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-sm backdrop-blur-sm opacity-0 transition-opacity group-hover/carousel:opacity-100 hover:bg-white"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-sm backdrop-blur-sm opacity-0 transition-opacity group-hover/carousel:opacity-100 hover:bg-white"
        aria-label="Próxima foto"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Indicadores (dots) */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setCurrent(i)
            }}
            className={cn(
              "size-1.5 rounded-full transition-all",
              i === current
                ? "w-4 bg-white shadow-sm"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
