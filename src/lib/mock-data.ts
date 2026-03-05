export interface PropertyListing {
  id: string
  name: string
  neighborhood: string
  city: string
  typology: string
  areaMin: number
  areaMax: number
  priceFrom: number
  status: "pre-launch" | "new" | "launched"
  imageUrl?: string
  address?: string
  description?: string
}

export const STATUS_LABELS: Record<PropertyListing["status"], string> = {
  "pre-launch": "Breve Lançamento",
  "new": "Recém-Lançado",
  "launched": "Lançado",
}

export const PRE_LAUNCH_PROPERTIES: PropertyListing[] = [
  {
    id: "1",
    name: "Aiká Moema",
    neighborhood: "Moema",
    city: "São Paulo",
    typology: "3 e 4 Quartos",
    areaMin: 124,
    areaMax: 259,
    priceFrom: 1850000,
    status: "pre-launch",
  },
  {
    id: "2",
    name: "Vanguard Alto de Pinheiros",
    neighborhood: "Alto de Pinheiros",
    city: "São Paulo",
    typology: "Studios e 2 Quartos",
    areaMin: 27,
    areaMax: 72,
    priceFrom: 620000,
    status: "pre-launch",
  },
  {
    id: "3",
    name: "Matice João Moura",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    typology: "2 e 3 Quartos",
    areaMin: 158,
    areaMax: 296,
    priceFrom: 2400000,
    status: "pre-launch",
  },
  {
    id: "4",
    name: "Infinity Perdizes",
    neighborhood: "Perdizes",
    city: "São Paulo",
    typology: "3 e 4 Quartos",
    areaMin: 127,
    areaMax: 216,
    priceFrom: 1650000,
    status: "pre-launch",
  },
]

export const NEW_PROPERTIES: PropertyListing[] = [
  {
    id: "5",
    name: "Legacy Vila Mariana",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    typology: "2 e 3 Quartos",
    areaMin: 68,
    areaMax: 142,
    priceFrom: 890000,
    status: "new",
  },
  {
    id: "6",
    name: "Haus Jardins",
    neighborhood: "Jardim Paulista",
    city: "São Paulo",
    typology: "1 e 2 Quartos",
    areaMin: 45,
    areaMax: 98,
    priceFrom: 750000,
    status: "new",
  },
  {
    id: "7",
    name: "Nóbile Itaim",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    typology: "4 Quartos",
    areaMin: 220,
    areaMax: 380,
    priceFrom: 4200000,
    status: "new",
  },
  {
    id: "8",
    name: "Vista Brooklin",
    neighborhood: "Brooklin",
    city: "São Paulo",
    typology: "Studios e 1 Quarto",
    areaMin: 28,
    areaMax: 52,
    priceFrom: 480000,
    status: "new",
  },
]

export const LAUNCHED_PROPERTIES: PropertyListing[] = [
  {
    id: "9",
    name: "One Residence Paraíso",
    neighborhood: "Paraíso",
    city: "São Paulo",
    typology: "2 e 3 Quartos",
    areaMin: 70,
    areaMax: 165,
    priceFrom: 1100000,
    status: "launched",
  },
  {
    id: "10",
    name: "Grand Park Morumbi",
    neighborhood: "Morumbi",
    city: "São Paulo",
    typology: "3 e 4 Quartos",
    areaMin: 140,
    areaMax: 290,
    priceFrom: 1950000,
    status: "launched",
  },
  {
    id: "11",
    name: "Urban Studios República",
    neighborhood: "República",
    city: "São Paulo",
    typology: "Studios",
    areaMin: 22,
    areaMax: 38,
    priceFrom: 320000,
    status: "launched",
  },
  {
    id: "12",
    name: "Reserva Anália Franco",
    neighborhood: "Anália Franco",
    city: "São Paulo",
    typology: "2 e 3 Quartos",
    areaMin: 85,
    areaMax: 178,
    priceFrom: 980000,
    status: "launched",
  },
]

export const NEIGHBORHOODS = [
  "Alto de Pinheiros",
  "Anália Franco",
  "Barra da Tijuca",
  "Botafogo",
  "Brooklin",
  "Copacabana",
  "Flamengo",
  "Ipanema",
  "Itaim Bibi",
  "Jardim Botânico",
  "Jardim Paulista",
  "Lagoa",
  "Laranjeiras",
  "Leblon",
  "Moema",
  "Morumbi",
  "Paraíso",
  "Perdizes",
  "Pinheiros",
  "Recreio dos Bandeirantes",
  "República",
  "São Conrado",
  "Tijuca",
  "Vila Mariana",
]

/* ─── Dados completos para a página /imoveis ─── */

const RJ_NEIGHBORHOODS = [
  "Barra da Tijuca",
  "Botafogo",
  "Copacabana",
  "Flamengo",
  "Ipanema",
  "Jardim Botânico",
  "Lagoa",
  "Laranjeiras",
  "Leblon",
  "Recreio dos Bandeirantes",
  "São Conrado",
  "Tijuca",
]

const NAMES = [
  "The Gardens", "Poema", "Tom", "Edro", "Quintessence",
  "Alameda 45", "Mundo Apto", "Essência", "Vitória Regia",
  "Solar", "Maré Alta", "Horizonte", "Brisa", "Atlântica",
  "Villa", "Porto Seguro", "Mirante", "Orla", "Panorama",
  "Reserva", "Belverde", "Aquarela", "Lumière", "Meridiano",
  "Mar Azul", "Terra Nova", "Solaris", "Costão", "Pátio",
  "Cais", "Boulevard", "Vila Real", "Alto Mar", "Arcos",
  "Cannes", "Monaco", "Riviera", "Azure", "Jade",
  "Opale", "Rubi", "Safira", "Topázio", "Coral",
  "Âmbar", "Cristal", "Berilo", "Citrino", "Ágata", "Ônix",
]

const TYPOLOGIES = [
  "Studios",
  "Studios e 1 Quarto",
  "1 e 2 Quartos",
  "2 Quartos",
  "2 e 3 Quartos",
  "3 Quartos",
  "3 e 4 Quartos",
  "4 Quartos",
]

const STATUSES: PropertyListing["status"][] = ["pre-launch", "new", "launched"]

function generateAllProperties(): PropertyListing[] {
  const properties: PropertyListing[] = []

  for (let i = 0; i < 100; i++) {
    const neighborhood = RJ_NEIGHBORHOODS[i % RJ_NEIGHBORHOODS.length]
    const name = `${NAMES[i % NAMES.length]} ${neighborhood.split(" ")[0]}`
    const typology = TYPOLOGIES[i % TYPOLOGIES.length]
    const status = STATUSES[i % STATUSES.length]
    const baseArea = 25 + (i % 8) * 30
    const basePrice = 350000 + (i % 12) * 180000

    properties.push({
      id: `all-${i + 1}`,
      name,
      neighborhood,
      city: "Rio de Janeiro",
      typology,
      areaMin: baseArea,
      areaMax: baseArea + 40 + (i % 5) * 20,
      priceFrom: basePrice,
      status,
      address: `Rua ${neighborhood}, ${100 + i * 13} - ${neighborhood}`,
      description: `Excelente empreendimento em ${neighborhood}, com infraestrutura completa, acabamento de alto padrão e localização privilegiada.`,
    })
  }

  return properties
}

export const ALL_PROPERTIES = generateAllProperties()

export const TOTAL_PROPERTIES = ALL_PROPERTIES.length

export const ITEMS_PER_PAGE = 24

export type SortOption = "relevance" | "price-asc" | "price-desc" | "date" | "area"

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Relevância", value: "relevance" },
  { label: "Menor valor", value: "price-asc" },
  { label: "Maior valor", value: "price-desc" },
  { label: "Data de atualização", value: "date" },
  { label: "Área do imóvel", value: "area" },
]

export function sortProperties(
  properties: PropertyListing[],
  sort: SortOption
): PropertyListing[] {
  const sorted = [...properties]
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom)
    case "price-desc":
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom)
    case "area":
      return sorted.sort((a, b) => b.areaMax - a.areaMax)
    default:
      return sorted
  }
}

export function paginateProperties(
  properties: PropertyListing[],
  page: number
): PropertyListing[] {
  const start = (page - 1) * ITEMS_PER_PAGE
  return properties.slice(start, start + ITEMS_PER_PAGE)
}
