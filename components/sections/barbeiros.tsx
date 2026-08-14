"use client";

import Image from "next/image";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { equipe, negocio } from "@/lib/content";
import { useMediaQuery } from "@/lib/use-media-query";
import { Botao, Etiqueta, Secao } from "@/components/ui";
import {
  MaskTitle,
  Reveal,
  ScaleReveal,
  TrilhaCapitulo,
  useCapitulo,
} from "@/components/motion-primitives";

const TOTAL = equipe.length;

/**
 * Barbeiros da Punchline.
 *
 * **Desktop:** os dois lado a lado, bloco centralizado e limitado a 860px.
 *
 * **Celular:** um de cada vez, trocando conforme o scroll. Empilhados, os dois
 * retratos viravam uma parede de 800px de foto.
 *
 * Retratos em preto e branco, conforme `specs/design.md` › Direção
 * Fotográfica. As fotos são quadradas (600x600) e o recorte 4/5 tira largura
 * das laterais — os rostos estão centralizados, então nada importante se perde.
 */
function CartaoBarbeiro({
  barbeiro,
  className = "",
}: {
  barbeiro: (typeof equipe)[number];
  className?: string;
}) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-hairline ${className}`}
    >
      <div className="relative h-full w-full">
        <Image
          src={barbeiro.foto}
          alt={`${barbeiro.nome}, ${barbeiro.papel.toLowerCase()} na Punchline Barbearia`}
          fill
          sizes="(max-width: 640px) 90vw, 45vw"
          className="grade-people object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
        <span className="eyebrow">{barbeiro.papel}</span>
        <h3 className="display mt-2 text-[clamp(1.8rem,2.8vw,2.4rem)] leading-none text-bone transition-colors duration-500 group-hover:text-gold">
          {barbeiro.nome}
        </h3>
      </div>

      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
      />
    </div>
  );
}

function BarbeiroCapitulo({
  barbeiro,
  indice,
  progresso,
}: {
  barbeiro: (typeof equipe)[number];
  indice: number;
  progresso: MotionValue<number>;
}) {
  const { opacidade, y, visibility } = useCapitulo(progresso, indice, TOTAL);

  return (
    <motion.div
      style={{ opacity: opacidade, y, visibility }}
      className="absolute inset-0"
    >
      <CartaoBarbeiro barbeiro={barbeiro} />
    </motion.div>
  );
}

export function Barbeiros() {
  const ref = useRef<HTMLDivElement>(null);
  const umPorVez = !useMediaQuery("(min-width: 640px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="barbeiros" className="relative bg-surface">
      <Secao className={umPorVez ? "!pb-0" : ""}>
        {/* Alinhado pelo topo. Com `items-end` as duas colunas casavam pela
            base, e como o parágrafo da direita tem sete linhas, o título era
            empurrado para o fim da seção. */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <div>
            <Etiqueta>Quem atende</Etiqueta>
            <MaskTitle
              lines={["Nossos", "Barbeiros"]}
              className="display mt-7 text-[clamp(2.6rem,7vw,5rem)] text-bone"
            />
          </div>

          <Reveal delay={0.15} className="max-w-md">
            <p className="text-base leading-relaxed text-ash">
              A relação entre cliente e barbeiro é essencial. Converse, explique
              seus gostos, sua rotina e aquilo que você precisa para o dia a dia.
              Um bom barbeiro não entrega apenas um corte: ele conhece você,
              entende suas preferências e sabe o que funciona para o seu estilo.
              Não fique pulando de galho em galho. Encontre o seu barbeiro,
              construa uma relação de confiança e deixe que ele conheça o seu
              cabelo, a sua barba e o seu estilo.
            </p>
            <div className="mt-7">
              <Botao href={negocio.linkAgendamento} variante="secundario">
                Escolher meu barbeiro
              </Botao>
            </div>
          </Reveal>
        </div>

        {/* Desktop e tablet: os dois lado a lado, limitados a 860px e
            centralizados — em largura cheia cada retrato passava de 630px. */}
        {!umPorVez && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:mx-auto lg:mt-20 lg:max-w-[860px] lg:gap-10">
            {equipe.map((barbeiro, i) => (
              <ScaleReveal key={barbeiro.id} delay={i * 0.1}>
                <div className="aspect-[4/5]">
                  <CartaoBarbeiro barbeiro={barbeiro} />
                </div>
              </ScaleReveal>
            ))}
          </div>
        )}
      </Secao>

      {/* Celular: um barbeiro por vez, trocando no scroll. */}
      {umPorVez && (
        <div
          ref={ref}
          className="relative"
          style={{ height: `${TOTAL * 100}svh` }}
        >
          <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-8">
            <div className="relative aspect-[4/5]">
              {equipe.map((barbeiro, i) => (
                <BarbeiroCapitulo
                  key={barbeiro.id}
                  barbeiro={barbeiro}
                  indice={i}
                  progresso={scrollYProgress}
                />
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              {equipe.map((barbeiro, i) => (
                <TrilhaCapitulo
                  key={barbeiro.id}
                  progresso={scrollYProgress}
                  indice={i}
                  total={TOTAL}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
