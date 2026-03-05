import { Container } from "./Container"
import { Logo } from "./Logo"
import { NavLinks } from "./NavLinks"
import { UserActions } from "./UserActions"
import { FavoritesLink } from "./FavoritesLink"
import { MobileMenu } from "./MobileMenu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-surface/80 backdrop-blur-xl supports-backdrop-filter:bg-surface/60">
      <Container>
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop nav — centro */}
          <div className="hidden md:flex">
            <NavLinks direction="horizontal" />
          </div>

          {/* Desktop: Favoritos + CTAs */}
          <div className="hidden md:flex items-center gap-1">
            <FavoritesLink />
            <UserActions variant="desktop" />
          </div>

          {/* Mobile: Favoritos + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <FavoritesLink />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  )
}
