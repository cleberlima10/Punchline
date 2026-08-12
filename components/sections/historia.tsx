"use client";

import Image from "next/image";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { historia } from "@/lib/content";
import { useMediaQuery } from "@/lib/use-media-query";
import { Etiqueta, Secao } from "@/components/ui";
import {
  MaskTitle,
  Reveal,
  ScaleReveal,
  TrilhaCapitulo,
  useCapitulo,
} from "@/components/motion-primitives";

/**
 * História da Barbearia.
 *
 * Texto em primeira pessoa, escrito e assinado pelo Felipe, apresentado como
 * depoimento.
 *
 * **Desktop:** foto fixa à esquerda, texto corrido à direita.
 *
 * **Celular:** os seis parágrafos são muito texto para uma tela só, então
 * viram três blocos de dois, trocando conforme o scroll — o mesmo
 * comportamento da Experiência e dos Serviços.
 */

/** Os parágrafos entram de dois em dois no celular. */
const POR_BLOCO = 2;
const blocos = Array.from(
  { length: Math.ceil(historia.paragrafos.length / POR_BLOCO) },
  (_, i) => historia.paragrafos.slice(i * POR_BLOCO, (i + 1) * POR_BLOCO),
);

function BlocoParagrafos({
  paragrafos,
  indice,
  progresso,
}: {
  paragrafos: string[];
  indice: number;
  progresso: MotionValue<number>;
}) {
  const { opacidade, y, visibility } = useCapitulo(
    progresso,
    indice,
    blocos.length,
  );

  return (
    <motion.div
      style={{ opacity: opacidade, y, visibility }}
      className="absolute inset-0 flex flex-col justify-center gap-5 text-base leading-relaxed text-ash"
    >
      {paragrafos.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </motion.div>
  );
}

function Remate() {
  return (
    <div className="border-l-2 border-gold pl-6">
      <p className="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight text-bone">
        {historia.remate}
      </p>
      <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-gold">
        {historia.autor} · {historia.papel}
      </p>
    </div>
  );
}

export function Historia() {
  const ref = useRef<HTMLDivElement>(null);
  const paginado = !useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="historia" className="relative bg-surface">
      <div className="mx-auto w-full max-w-[1320px] px-6 pt-28 sm:px-10 md:pt-40 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-start lg:gap-24">
          {/* Foto: o salão com as cadeiras antigas. Fixa ao lado do texto no
              desktop; no celular abre a seção. */}
          <ScaleReveal className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-hairline lg:sticky lg:top-32">
            <Image
              src={historia.foto}
              alt={historia.fotoAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="grade-room object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </ScaleReveal>

          <div>
            <Etiqueta>A Punchline</Etiqueta>

            <MaskTitle
              lines={["História", "da Barbearia"]}
              className="display mt-7 text-[clamp(2.5rem,6vw,4.6rem)] text-bone"
            />

            {/* Desktop: texto corrido. */}
            {!paginado && (
              <>
                <div className="mt-9 space-y-5 text-base leading-relaxed text-ash">
                  {historia.paragrafos.map((paragrafo, i) => (
                    <Reveal key={i} delay={0.06 + i * 0.05}>
                      <p>{paragrafo}</p>
                    </Reveal>
                  ))}
                </div>
                <Reveal delay={0.2} className="mt-10">
                  <Remate />
                </Reveal>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Celular: os parágrafos passam de dois em dois durante o scroll. */}
      {paginado && (
        <>
          <div
            ref={ref}
            className="relative"
            style={{ height: `${blocos.length * 100}svh` }}
          >
            <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-6 sm:px-10">
              {/* 26rem: o bloco mais alto (parágrafos 1 e 2, com o trecho do
                  Vasilis) mede 384px num celular de 375px. Medido, não
                  estimado. */}
              <div className="relative h-[26rem]">
                {blocos.map((b, i) => (
                  <BlocoParagrafos
                    key={i}
                    paragrafos={b}
                    indice={i}
                    progresso={scrollYProgress}
                  />
                ))}
              </div>

              <div className="mt-8 flex gap-2">
                {blocos.map((_, i) => (
                  <TrilhaCapitulo
                    key={i}
                    progresso={scrollYProgress}
                    indice={i}
                    total={blocos.length}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 pb-28 sm:px-10">
            <Reveal>
              <Remate />
            </Reveal>
          </div>
        </>
      )}

      {/* O respiro final do desktop vive aqui: no celular quem fecha a seção é
          o bloco do remate acima. */}
      {!paginado && <div className="pb-28 md:pb-40" />}
    </section>
  );
}
