import Link from "next/link"

import { cn } from "@/lib/utils"
import { ROUTES } from "@/constants"
import { Building2 } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn("group flex items-center gap-2.5", className)}
    >
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
        <Building2 className="size-5 text-primary" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-secondary">
          Renata
        </span>
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary">
          Imóveis
        </span>
      </div>
    </Link>
  )
}
