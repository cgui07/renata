"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatArea } from "@/lib/formatters"
import { ContactModal } from "@/components/common/ContactModal"
import { FavoriteButton } from "@/components/common/FavoriteButton"
import type { PropertyListing, STATUS_LABELS } from "@/lib/mock-data"
import { PropertyCarousel } from "@/components/common/PropertyCarousel"
import { MapPin, Maximize2, Building2, MessageCircle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface PropertyDetailSheetProps {
  property: PropertyListing
  statusLabels: typeof STATUS_LABELS
  leadSource?: "property" | "favorites_property"
}

const statusStyles: Record<PropertyListing["status"], string> = {
  "pre-launch": "bg-accent/90 text-accent-foreground",
  "new": "bg-primary/90 text-primary-foreground",
  "launched": "bg-secondary/90 text-secondary-foreground",
}

export function PropertyDetailSheet({
  property,
  statusLabels,
  leadSource = "property",
}: PropertyDetailSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="absolute inset-0 z-0 cursor-pointer"
          aria-label={`Ver detalhes de ${property.name}`}
        />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="overflow-y-auto p-0 sm:max-w-lg w-full"
        showCloseButton
      >
        <div className="relative">
          <PropertyCarousel name={property.name} slideCount={5} className="aspect-video" />
          <FavoriteButton
            propertyId={property.id}
            className="absolute top-3 right-14 z-10"
          />
          <Badge
            className={cn(
              "absolute bottom-3 left-3 text-[0.65rem] font-semibold uppercase tracking-wider border-0 px-2.5 py-1 shadow-sm",
              statusStyles[property.status]
            )}
          >
            {statusLabels[property.status]}
          </Badge>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div>
            <SheetTitle className="text-xl font-bold text-foreground leading-snug">
              {property.name}
            </SheetTitle>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              <span>{property.neighborhood}, {property.city}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-neutral-50 px-3 py-2">
              <Maximize2 className="size-4 text-primary" />
              <div className="text-sm">
                <p className="text-xs text-muted-foreground">Área</p>
                <p className="font-medium text-foreground">
                  {formatArea(property.areaMin)} a {formatArea(property.areaMax)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-neutral-50 px-3 py-2">
              <Building2 className="size-4 text-primary" />
              <div className="text-sm">
                <p className="text-xs text-muted-foreground">Tipologia</p>
                <p className="font-medium text-foreground">{property.typology}</p>
              </div>
            </div>
          </div>

          {property.address && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Endereço
              </p>
              <p className="text-sm text-foreground">{property.address}</p>
            </div>
          )}

          {property.description && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Sobre o empreendimento
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {property.description}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-border/50 bg-neutral-50 px-5 py-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              A partir de
            </p>
            <p className="mt-0.5 text-2xl font-bold text-primary">
              {formatCurrency(property.priceFrom)}
            </p>
          </div>

          <ContactModal
            propertyId={property.id}
            propertyName={property.name}
            source={leadSource}
            trigger={
              <Button className="w-full gap-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold h-12 text-base">
                <MessageCircle className="size-5" />
                Falar com o corretor
              </Button>
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
