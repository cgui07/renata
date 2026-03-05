"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { PROPERTY_TYPES } from "@/constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NEIGHBORHOODS } from "@/lib/mock-data"
import { Container } from "@/components/layout/Container"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const BEDROOM_OPTIONS = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4+", value: "4" },
]

export function BuyFilterBar() {
  const [bedrooms, setBedrooms] = useState<string | null>(null)

  return (
    <div className="relative z-10 -mt-10 pb-4">
      <Container size="lg">
        <div
          className={cn(
            "rounded-2xl border border-border/40 bg-surface p-6 md:p-8",
            "shadow-xl shadow-secondary/5"
          )}
        >          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground">
              Encontre seu imóvel
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Busque por tipo, localização, preço e mais
            </p>
          </div>          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:items-end">            <FilterField label="Tipo" className="lg:col-span-2">
              <Select>
                <SelectTrigger className="h-11 bg-surface border-border/60">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>            <FilterField label="Bairro / Região" className="lg:col-span-3">
              <Select>
                <SelectTrigger className="h-11 bg-surface border-border/60">
                  <SelectValue placeholder="Todos os bairros" />
                </SelectTrigger>
                <SelectContent>
                  {NEIGHBORHOODS.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>            <FilterField label="Faixa de preço" className="lg:col-span-3">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Mínimo"
                  className="h-11 bg-surface border-border/60 text-sm"
                />
                <span className="text-muted-foreground text-sm shrink-0">—</span>
                <Input
                  type="text"
                  placeholder="Máximo"
                  className="h-11 bg-surface border-border/60 text-sm"
                />
              </div>
            </FilterField>            <FilterField label="Quartos" className="lg:col-span-2">
              <div className="flex gap-1">
                {BEDROOM_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setBedrooms(bedrooms === opt.value ? null : opt.value)
                    }
                    className={cn(
                      "flex h-11 flex-1 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                      bedrooms === opt.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/60 bg-surface text-neutral-500 hover:border-primary/40 hover:text-primary"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FilterField>            <div className="lg:col-span-2 flex items-end">
              <Button
                size="lg"
                className="w-full h-11 gap-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
              >
                <Search className="size-4" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}


function FilterField({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}
