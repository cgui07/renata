import type { PropertyStatus, PropertyType } from "@/constants"

export interface Property {
  id: string
  slug: string
  title: string
  description: string
  type: PropertyType
  status: PropertyStatus
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  parkingSpots: number
  address: PropertyAddress
  images: string[]
  features: string[]
  featured: boolean
  createdAt: string
}

export interface PropertyAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface PropertyFilters {
  type?: PropertyType
  status?: PropertyStatus
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  bedrooms?: number
  city?: string
  neighborhood?: string
}
