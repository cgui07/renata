import type { Metadata } from "next"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { PropertyCard } from "@/components/common/PropertyCard"
import { Pagination } from "@/components/common/Pagination"
import { SortDropdown } from "@/components/common/SortDropdown"
import {
  ALL_PROPERTIES,
  ITEMS_PER_PAGE,
  STATUS_LABELS,
  sortProperties,
  paginateProperties,
  type SortOption,
} from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Imóveis à Venda",
  description: "Confira todos os imóveis à venda no Rio de Janeiro com a Renata Imóveis.",
}

interface PageProps {
  searchParams: Promise<{ page?: string; sort?: string }>
}

export default async function ImoveisPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, Number(params.page) || 1)
  const currentSort = (params.sort as SortOption) || "relevance"

  const sorted = sortProperties(ALL_PROPERTIES, currentSort)
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const page = Math.min(currentPage, totalPages)
  const properties = paginateProperties(sorted, page)

  const extraParams: Record<string, string> = {}
  if (currentSort !== "relevance") extraParams.sort = currentSort

  return (
    <Section spacing="md">
      <Container>
        {/* Header com contagem + ordenação */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              <span className="text-primary">{ALL_PROPERTIES.length.toLocaleString("pt-BR")}</span>{" "}
              Imóveis à venda em Rio de Janeiro - RJ
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </p>
          </div>

          <SortDropdown currentSort={currentSort} currentPage={page} />
        </div>

        {/* Grid 4 colunas */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              statusLabels={STATUS_LABELS}
              variant="full"
            />
          ))}
        </div>

        {/* Paginação */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/imoveis"
          extraParams={extraParams}
          className="mt-12"
        />
      </Container>
    </Section>
  )
}
