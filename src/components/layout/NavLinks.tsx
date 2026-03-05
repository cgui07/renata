"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/constants"

interface NavLinksProps {
  /** Callback executado ao clicar em um link (usado pelo mobile para fechar o menu) */
  onNavigate?: () => void
  /** Orientação do menu */
  direction?: "horizontal" | "vertical"
  className?: string
}

export function NavLinks({
  onNavigate,
  direction = "horizontal",
  className,
}: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex",
        direction === "horizontal"
          ? "items-center gap-1"
          : "flex-col gap-1",
        className
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
              direction === "horizontal"
                ? "hover:bg-primary/5 hover:text-primary"
                : "hover:bg-primary/5 hover:text-primary py-3 px-4",
              isActive
                ? "text-primary"
                : "text-neutral-700"
            )}
          >
            {item.label}
            {isActive && direction === "horizontal" && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
            )}
            {isActive && direction === "vertical" && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
