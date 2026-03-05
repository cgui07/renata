export const ROUTES = {
  HOME: "/",
  PROPERTIES: "/imoveis",
  PROPERTY_DETAIL: (slug: string) => `/imoveis/${slug}`,
  CONTACT: "/contato",
  ABOUT: "/sobre",
} as const
