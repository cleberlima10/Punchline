import { SchemaLocalBusiness } from "@/components/schema-local-business";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Faixa } from "@/components/sections/faixa";
import { Experiencia } from "@/components/sections/experiencia";
import { Servicos } from "@/components/sections/servicos";
import { Barbeiros } from "@/components/sections/barbeiros";
import { Historia } from "@/components/sections/historia";
import { Galeria } from "@/components/sections/galeria";
import { Produtos } from "@/components/sections/produtos";
import { Curso } from "@/components/sections/curso";
import { ProvaSocial } from "@/components/sections/prova-social";
import { Localizacao } from "@/components/sections/localizacao";
import { Fecho } from "@/components/sections/fecho";
import { Footer } from "@/components/sections/footer";
import { AgendamentoFlutuante } from "@/components/sections/agendamento-flutuante";

export default function Home() {
  return (
    <>
      <SchemaLocalBusiness />
      <Header />
      <main>
        <Hero />
        <Faixa />
        <Experiencia />
        <Servicos />
        <Barbeiros />
        <Historia />
        <Galeria />
        <Produtos />
        <Curso />
        <ProvaSocial />
        <Localizacao />
        <Fecho />
      </main>
      <Footer />
      <AgendamentoFlutuante />
    </>
  );
}
