"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import { NavLinks } from "./NavLinks"
import { UserActions } from "./UserActions"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-neutral-700 hover:text-primary hover:bg-primary/5"
          aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[320px] bg-surface p-0 flex flex-col [&>button]:hidden"
      >
        <SheetHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle asChild>
              <Logo />
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-neutral-500 hover:text-primary hover:bg-primary/5 -mr-2"
              aria-label="Fechar menu"
            >
              <X className="size-5" />
            </Button>
          </div>
        </SheetHeader>

        <Separator className="bg-border" />

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <NavLinks
            direction="vertical"
            onNavigate={() => setOpen(false)}
          />
        </div>

        <Separator className="bg-border" />

        <div className="px-6 py-5">
          <UserActions variant="mobile" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
