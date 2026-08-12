"use client";

import Image from "next/image";
import { produtos, negocio } from "@/lib/content";
import { Botao, Etiqueta, Secao } from "@/components/ui";
import { MaskTitle, Parallax, Reveal, ScaleReveal } from "@/components/motion-primitives";

export function Produtos() {
  return (
    <Secao id="produtos" className="overflow-hidden bg-surface">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <Etiqueta>Produtos</Etiqueta>

          <MaskTitle
            lines={produtos.titulo}
            className="display mt-7 text-[clamp(2.6rem,7vw,5.2rem)] text-bone"
          />

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ash">
              {produtos.descricao}
            </p>
          </Reveal>

          {/* Listagem simples, sem vincular marca a foto — decisão do cliente.
              Separadas em nacionais e importadas porque a origem é argumento
              de venda: mostra curadoria dos dois lados. */}
          <Reveal delay={0.2} className="mt-10 space-y-7">
            {(
              [
                ["Nacionais", produtos.marcas.nacionais],
                ["Importadas", produtos.marcas.importadas],
              ] as const
            ).map(([grupo, lista]) => (
              <div key={grupo}>
                <p className="eyebrow">{grupo}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {lista.map((marca) => (
                    <span
                      key={marca}
                      className="rounded-full border border-hairline px-4 py-2 text-xs uppercase tracking-[0.12em] text-ash transition-colors duration-500 hover:border-gold/40 hover:text-bone"
                    >
                      {marca}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.28} className="mt-10">
            {/* Indicação de produto é conversa, não agendamento — por isso vai
                para o WhatsApp e não para o AppBarber. */}
            <Botao href={negocio.linkWhatsapp} variante="secundario">
              Pedir indicação
            </Botao>
          </Reveal>
        </div>

        {/* Mosaico de produtos com camadas em velocidades distintas */}
        <div className="order-1 grid grid-cols-2 gap-4 lg:order-2 lg:gap-6">
          <Parallax speed={44} className="flex flex-col gap-4 lg:gap-6">
            <ScaleReveal className="relative aspect-[3/4] overflow-hidden rounded-xl border border-hairline">
              <Image
                src={produtos.fotos[0].src}
                alt={produtos.fotos[0].alt}
                fill
                sizes="(max-width: 1024px) 45vw, 25vw"
                className="grade-detail object-cover"
              />
            </ScaleReveal>
            <ScaleReveal
              delay={0.1}
              className="relative aspect-square overflow-hidden rounded-xl border border-hairline"
            >
              <Image
                src={produtos.fotos[1].src}
                alt={produtos.fotos[1].alt}
                fill
                sizes="(max-width: 1024px) 45vw, 25vw"
                className="grade-detail object-cover"
              />
            </ScaleReveal>
          </Parallax>

          <Parallax speed={-52} className="flex flex-col gap-4 pt-10 lg:gap-6 lg:pt-16">
            <ScaleReveal
              delay={0.06}
              className="relative aspect-square overflow-hidden rounded-xl border border-hairline"
            >
              <Image
                src={produtos.fotos[2].src}
                alt={produtos.fotos[2].alt}
                fill
                sizes="(max-width: 1024px) 45vw, 25vw"
                className="grade-detail object-cover"
              />
            </ScaleReveal>
            <ScaleReveal
              delay={0.16}
              className="relative aspect-[3/4] overflow-hidden rounded-xl border border-hairline"
            >
              <Image
                src={produtos.fotos[3].src}
                alt={produtos.fotos[3].alt}
                fill
                sizes="(max-width: 1024px) 45vw, 25vw"
                className="grade-detail object-cover"
              />
            </ScaleReveal>
          </Parallax>
        </div>
      </div>
    </Secao>
  );
}
