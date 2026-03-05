export const PROPERTY_TYPES = [
  { label: "Apartamento", value: "apartment" },
  { label: "Casa", value: "house" },
  { label: "Terreno", value: "land" },
  { label: "Comercial", value: "commercial" },
  { label: "Cobertura", value: "penthouse" },
] as const

export const PROPERTY_STATUS = [
  { label: "Venda", value: "sale" },
  { label: "Locação", value: "rent" },
  { label: "Venda e Locação", value: "both" },
] as const

export const PROPERTY_FEATURES = [
  { label: "Piscina", value: "pool" },
  { label: "Garagem", value: "garage" },
  { label: "Academia", value: "gym" },
  { label: "Churrasqueira", value: "barbecue" },
  { label: "Portaria 24h", value: "concierge" },
  { label: "Elevador", value: "elevator" },
] as const

export type PropertyType = (typeof PROPERTY_TYPES)[number]["value"]
export type PropertyStatus = (typeof PROPERTY_STATUS)[number]["value"]
