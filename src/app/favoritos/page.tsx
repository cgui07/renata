"use client"

import Link from "next/link"

import { Heart } from "lucide-react"
import { ROUTES } from "@/constants"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/useFavorites"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { PropertyCard } from "@/components/common/PropertyCard"
import { ALL_PROPERTIES, PRE_LAUNCH_PROPERTIES, NEW_PROPERTIES, LAUNCHED_PROPERTIES, STATUS_LABELS } from "@/lib/mock-data"

const EVERY_PROPERTY = [
  ...PRE_LAUNCH_PROPERTIES,
  ...NEW_PROPERTIES,
  ...LAUNCHED_PROPERTIES,
  ...ALL_PROPERTIES,
]

export default function FavoritosPage() {
  const { favorites, count } = useFavorites()

  const favoriteProperties = EVERY_PROPERTY.filter((p) => favorites.has(p.id))

  
  const unique = favoriteProperties.filter(
    (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i
  )

  return (
    <Section spacing="md">
      <Container>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Heart className="size-6 text-danger" />
            Meus Favoritos
            {count > 0 && (
              <span className="text-primary text-lg font-normal">({count})</span>
            )}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Imóveis que você salvou para ver depois
          </p>
          <div className="mt-3 h-0.5 w-12 rounded-full bg-primary" />
        </div>

        {unique.length > 0 ? (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {unique.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                statusLabels={STATUS_LABELS}
                variant="full"
                leadSource="favorites_property"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-neutral-100">
              <Heart className="size-7 text-neutral-300" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                Nenhum favorito ainda
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Clique no coração dos imóveis para salvá-los aqui.
              </p>
            </div>
            <Button
              asChild
              className="mt-2 bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              <Link href={ROUTES.PROPERTIES}>Explorar imóveis</Link>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  )
}
