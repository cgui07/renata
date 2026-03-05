import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatArea } from "@/lib/formatters"
import { ContactModal } from "@/components/common/ContactModal"
import { FavoriteButton } from "@/components/common/FavoriteButton"
import type { PropertyListing, STATUS_LABELS } from "@/lib/mock-data"
import { PropertyCarousel } from "@/components/common/PropertyCarousel"
import { Building2, MapPin, Maximize2, ArrowRight, MessageCircle } from "lucide-react"

interface PropertyCardProps {
  property: PropertyListing
  statusLabels: typeof STATUS_LABELS
  
  variant?: "compact" | "full"
  leadSource?: "property" | "favorites_property"
  className?: string
}

const statusStyles: Record<PropertyListing["status"], string> = {
  "pre-launch": "bg-accent/90 text-accent-foreground",
  "new": "bg-primary/90 text-primary-foreground",
  "launched": "bg-secondary/90 text-secondary-foreground",
}

export function PropertyCard({
  property,
  statusLabels,
  variant = "compact",
  leadSource = "property",
  className,
}: PropertyCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border/50",
        "bg-surface transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5",
        className
      )}
    >      {variant === "full" ? (
        <div className="relative">
          <PropertyCarousel name={property.name} slideCount={5} />
          <FavoriteButton
            propertyId={property.id}
            className="absolute top-3 right-3 z-10"
          />
        </div>
      ) : (
        <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-secondary/5 to-primary/10">
            <Building2 className="size-10 text-neutral-300" />
            <span className="text-xs text-neutral-400">Imagem em breve</span>
          </div>          <Badge
            className={cn(
              "absolute top-3 left-3 text-[0.65rem] font-semibold uppercase tracking-wider border-0 px-2.5 py-1 shadow-sm",
              statusStyles[property.status]
            )}
          >
            {statusLabels[property.status]}
          </Badge>          <FavoriteButton
            propertyId={property.id}
            className="absolute top-3 right-3 z-10"
          />          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
        </div>
      )}      <div className="flex flex-1 flex-col gap-3 p-5">        <div>
          <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
            {property.name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span>{property.neighborhood}, {property.city}</span>
          </div>
        </div>        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="size-3.5" />
            {formatArea(property.areaMin)} a {formatArea(property.areaMax)}
          </span>
          <span className="hidden sm:inline text-neutral-300">|</span>
          <span>{property.typology}</span>
        </div>        {variant === "full" && property.address && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
            {property.address}
          </p>
        )}        {variant === "full" && property.description && (
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {property.description}
          </p>
        )}        <div
          className={cn(
            "mt-auto pt-3 border-t border-border/50",
            variant === "compact"
              ? "flex items-end justify-between gap-3"
              : "flex flex-col gap-3"
          )}
        >
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                A partir de
              </p>
              <p className="text-lg font-bold text-primary leading-tight">
                {formatCurrency(property.priceFrom)}
              </p>
            </div>

            {variant === "compact" && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs font-semibold text-secondary hover:text-primary hover:bg-primary/5 shrink-0"
              >
                Ver detalhes
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            )}
          </div>

          {variant === "full" && (
            <ContactModal
              propertyId={property.id}
              propertyName={property.name}
              source={leadSource}
              trigger={
                <Button className="w-full gap-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold">
                  <MessageCircle className="size-4" />
                  Falar com o corretor
                </Button>
              }
            />
          )}
        </div>
      </div>
    </article>
  )
}
