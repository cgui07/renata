import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { PropertyCard } from "@/components/common/PropertyCard"
import { STATUS_LABELS } from "@/lib/mock-data"
import type { PropertyListing } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface PropertySectionProps {
  title: string
  subtitle?: string
  properties: PropertyListing[]
  className?: string
}

export function PropertySection({
  title,
  subtitle,
  properties,
  className,
}: PropertySectionProps) {
  return (
    <Section spacing="sm" className={className}>
      <Container>
        {/* Header da seção */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
          <div className="mt-3 h-0.5 w-12 rounded-full bg-primary" />
        </div>

        {/* Grid de cards */}
        <div
          className={cn(
            "grid gap-5",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              statusLabels={STATUS_LABELS}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
