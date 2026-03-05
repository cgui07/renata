"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  extraParams?: Record<string, string>
  className?: string
}

function buildUrl(
  basePath: string,
  page: number,
  extraParams?: Record<string, string>
) {
  const params = new URLSearchParams()
  if (page > 1) params.set("page", String(page))
  if (extraParams) {
    for (const [k, v] of Object.entries(extraParams)) {
      if (v) params.set(k, v)
    }
  }
  const qs = params.toString()
  return `${basePath}${qs ? `?${qs}` : ""}`
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  extraParams,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getVisiblePages(currentPage, totalPages)

  return (
    <nav
      aria-label="Paginacao"
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <PaginationLink
        href={currentPage > 1 ? buildUrl(basePath, currentPage - 1, extraParams) : undefined}
        disabled={currentPage <= 1}
        aria-label="Pagina anterior"
      >
        <ChevronLeft className="size-4" />
      </PaginationLink>
      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex size-10 items-center justify-center text-muted-foreground"
          >
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <PaginationLink
            key={page}
            href={buildUrl(basePath, page, extraParams)}
            active={page === currentPage}
          >
            {page}
          </PaginationLink>
        )
      )}
      <PaginationLink
        href={currentPage < totalPages ? buildUrl(basePath, currentPage + 1, extraParams) : undefined}
        disabled={currentPage >= totalPages}
        aria-label="Proxima pagina"
      >
        <ChevronRight className="size-4" />
      </PaginationLink>
    </nav>
  )
}

function PaginationLink({
  href,
  active,
  disabled,
  children,
  ...props
}: {
  href?: string
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  "aria-label"?: string
}) {
  const baseStyles =
    "flex size-10 items-center justify-center rounded-md text-sm font-medium transition-colors"

  if (disabled || !href) {
    return (
      <span
        className={cn(baseStyles, "cursor-not-allowed text-neutral-300")}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        baseStyles,
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-neutral-700 hover:bg-primary/5 hover:text-primary"
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

function getVisiblePages(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | "ellipsis")[] = []

  pages.push(1)

  if (current > 3) {
    pages.push("ellipsis")
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push("ellipsis")
  }

  pages.push(total)

  return pages
}
