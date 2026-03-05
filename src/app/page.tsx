import Link from "next/link"

import { ROUTES } from "@/constants"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { BuyFilterBar } from "@/components/sections/BuyFilterBar"
import { PropertySection } from "@/components/sections/PropertySection"
import {
  PRE_LAUNCH_PROPERTIES,
  NEW_PROPERTIES,
  LAUNCHED_PROPERTIES,
} from "@/lib/mock-data"

export default function HomePage() {
  return (
    <>      <Section spacing="lg" className="bg-linear-to-b from-secondary/3 to-surface pb-16">
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
              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                <Link href={ROUTES.PROPERTIES}>Ver imóveis</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/5">
                <Link href={ROUTES.CONTACT}>Falar com especialista</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>      <BuyFilterBar />      <PropertySection
        title="Breves Lançamentos"
        subtitle="Empreendimentos em fase de pré-lançamento com condições exclusivas"
        properties={PRE_LAUNCH_PROPERTIES}
        className="pt-12"
      />      <PropertySection
        title="Recém-Lançados"
        subtitle="Os mais novos empreendimentos disponíveis no mercado"
        properties={NEW_PROPERTIES}
      />      <PropertySection
        title="Lançados"
        subtitle="Empreendimentos consolidados com unidades disponíveis"
        properties={LAUNCHED_PROPERTIES}
      />      <Section spacing="sm" className="pb-16">
        <Container>
          <div className="flex justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-10 border-primary/40 text-primary font-semibold hover:bg-primary/5 hover:border-primary"
            >
              <Link href={ROUTES.PROPERTIES}>Ver mais destaques</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
