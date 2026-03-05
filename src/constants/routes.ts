export const ROUTES = {
  HOME: "/",
  PROPERTIES: "/imoveis",
  PROPERTY_DETAIL: (slug: string) => `/imoveis/${slug}`,
  LAUNCHES: "/lancamentos",
  INVESTMENTS: "/investimentos",
  CONTACT: "/contato",
  ABOUT: "/sobre",
  FAVORITES: "/favoritos",
} as const

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: ROUTES.HOME },
  { label: "Imóveis", href: ROUTES.PROPERTIES },
  { label: "Lançamentos", href: ROUTES.LAUNCHES },
  { label: "Investimentos", href: ROUTES.INVESTMENTS },
  { label: "Sobre", href: ROUTES.ABOUT },
  { label: "Contato", href: ROUTES.CONTACT },
]
