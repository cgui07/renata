import Link from "next/link"
import { Container } from "@/components/layout"
import { Section } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"

export default function HomePage() {
  return (
    <>
      <Section spacing="xl" className="bg-surface">
        <Container>
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
              Encontre o imóvel{" "}
              <span className="text-primary">dos seus sonhos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Apartamentos, casas e terrenos nas melhores localizações.
              A Renata Imóveis cuida de cada detalhe para você.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg">
                <Link href={ROUTES.PROPERTIES}>Ver imóveis</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={ROUTES.CONTACT}>Falar com especialista</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
