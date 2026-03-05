import { MessageCircle, CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UserActionsProps {
  variant?: "desktop" | "mobile"
  className?: string
}

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de mais informações sobre os imóveis."

export function UserActions({ variant = "desktop", className }: UserActionsProps) {
  const isMobile = variant === "mobile"

  return (
    <div
      className={cn(
        "flex",
        isMobile ? "flex-col gap-3" : "items-center gap-2",
        className
      )}
    >
      <Button
        variant="outline"
        size={isMobile ? "lg" : "sm"}
        className={cn(
          "gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/50",
          isMobile && "w-full justify-center"
        )}
        asChild
      >
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-4" />
          <span>WhatsApp</span>
        </a>
      </Button>

      <Button
        size={isMobile ? "lg" : "sm"}
        className={cn(
          "gap-2 bg-primary hover:bg-primary-dark text-primary-foreground",
          isMobile && "w-full justify-center"
        )}
      >
        <CalendarCheck className="size-4" />
        <span>Agendar visita</span>
      </Button>
    </div>
  )
}
