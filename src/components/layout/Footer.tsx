import Link from "next/link"
import { ROUTES } from "@/constants"
import { Container } from "./Container"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-lg font-bold text-primary">Renata</span>
            <span className="text-lg font-light text-secondary"> Imóveis</span>
            <p className="mt-1 text-sm text-muted-foreground">
              Realizando o sonho da casa própria.
            </p>
          </div>

          <nav className="flex gap-6 text-sm text-neutral-500">
            <Link href={ROUTES.PROPERTIES} className="hover:text-primary transition-colors">
              Imóveis
            </Link>
            <Link href={ROUTES.ABOUT} className="hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link href={ROUTES.CONTACT} className="hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>
        </div>

        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {year} Renata Imóveis. Todos os direitos reservados.
        </div>
      </Container>
    </footer>
  )
}
