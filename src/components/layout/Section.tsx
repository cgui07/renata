import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Espaçamento vertical. Padrão: md */
  spacing?: "sm" | "md" | "lg" | "xl"
  /** Tag HTML a renderizar. Padrão: section */
  as?: "section" | "div" | "article" | "main"
}

const spacingMap = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-20",
  lg: "py-16 md:py-28",
  xl: "py-20 md:py-36",
}

export function Section({
  spacing = "md",
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(spacingMap[spacing], className)} {...props}>
      {children}
    </Tag>
  )
}
