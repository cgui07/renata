import Link from "next/link"
import { ROUTES } from "@/constants"
import { Container } from "./Container"

const navLinks = [
  { label: "Início", href: ROUTES.HOME },
  { label: "Imóveis", href: ROUTES.PROPERTIES },
  { label: "Sobre", href: ROUTES.ABOUT },
  { label: "Contato", href: ROUTES.CONTACT },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Renata</span>
            <span className="text-xl font-light text-secondary">Imóveis</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  )
}
