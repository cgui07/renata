"use client"

import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SORT_OPTIONS, type SortOption } from "@/lib/mock-data"

interface SortDropdownProps {
  currentSort: SortOption
  currentPage: number
}

export function SortDropdown({ currentSort, currentPage }: SortDropdownProps) {
  const router = useRouter()

  function handleSort(value: string) {
    const params = new URLSearchParams()
    if (value !== "relevance") params.set("sort", value)
    // Resetar para página 1 ao mudar a ordenação
    const qs = params.toString()
    router.push(`/imoveis${qs ? `?${qs}` : ""}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar</span>
      <Select value={currentSort} onValueChange={handleSort}>
        <SelectTrigger className="w-48 h-10 bg-surface border-border/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
