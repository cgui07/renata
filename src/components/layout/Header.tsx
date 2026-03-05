import { Logo } from "./Logo"
import { NavLinks } from "./NavLinks"
import { Container } from "./Container"
import { MobileMenu } from "./MobileMenu"
import { UserActions } from "./UserActions"
import { FavoritesLink } from "./FavoritesLink"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-surface/80 backdrop-blur-xl supports-backdrop-filter:bg-surface/60">
      <Container>
        <div className="flex h-18 items-center justify-between">          <Logo />          <div className="hidden md:flex">
            <NavLinks direction="horizontal" />
          </div>          <div className="hidden md:flex items-center gap-1">
            <FavoritesLink />
            <UserActions variant="desktop" />
          </div>          <div className="flex md:hidden items-center gap-1">
            <FavoritesLink />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  )
}
