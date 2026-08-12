"use client";

import { motion, useScroll, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { grupos, negocio } from "@/lib/content";
import { Botao, Etiqueta } from "@/components/ui";
import {
  MaskTitle,
  Reveal,
  TrilhaCapitulo,
  useCapitulo,
} from "@/components/motion-primitives";

const TOTAL = grupos.length;

/**
 * Um grupo de serviços por vez, no mesmo comportamento da seção Experiência:
 * Cortes entra, sai, Barba assume, e assim por diante conforme o scroll.
 *
 * Os grupos ficam empilhados em `absolute inset-0`, então a troca é feita por
 * opacidade + visibilidade — ver `useCapitulo`.
 */
function GrupoServicos({
  grupo,
  indice,
  progresso,
}: {
  grupo: (typeof grupos)[number];
  indice: number;
  progresso: MotionValue<number>;
}) {
  const { opacidade, y, visibility } = useCapitulo(progresso, indice, TOTAL);

  return (
    <motion.div
      style={{ opacity: opacidade, y, visibility }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span className="display text-[2rem] leading-none text-gold/25 sm:text-[2.5rem]">
          {String(indice + 1).padStart(2, "0")}
        </span>
        <h3 className="eyebrow">{grupo.titulo}</h3>
        <span className="h-px flex-1 bg-hairline" aria-hidden />
        <span className="text-[0.6rem] uppercase tracking-[0.18em] text-ash/60 sm:text-[0.65rem]">
          Duração
        </span>
      </div>

      <ul className="mt-3">
        {grupo.itens.map((item) => (
          <li
            key={item.nome}
            className="group flex items-baseline justify-between gap-4 border-b border-hairline py-3.5 transition-colors duration-500 hover:border-gold/30 sm:gap-6 sm:py-5"
          >
            <div className="min-w-0">
              <p className="display text-[1.35rem] leading-none text-bone transition-colors duration-500 group-hover:text-gold sm:text-[1.75rem]">
                {item.nome}
              </p>
              {item.detalhe && (
                <p className="mt-1.5 text-[0.8rem] text-ash sm:mt-2 sm:text-sm">
                  {item.detalhe}
                </p>
              )}
            </div>

            <span className="shrink-0 whitespace-nowrap font-sans text-[0.8rem] tabular-nums text-ash transition-colors duration-500 group-hover:text-bone sm:text-sm">
              {item.duracao}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Servicos() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="servicos" className="relative bg-ink">
      {/*
        Uma estrutura só, dois comportamentos, sem duplicar markup.

        No desktop as duas colunas do grid têm a mesma altura (400svh), então o
        cabeçalho fica pinado ao lado da lista durante toda a narrativa.

        No celular o grid vira bloco: o cabeçalho rola normalmente e só a lista
        fica fixa. Foi medido — cabeçalho (399px) + maior grupo (331px) passa de
        800px, e não cabe na tela de um iPhone SE. Pinar os dois cortaria
        conteúdo.
      */}
      <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-16">
        <div>
          <div className="pt-28 md:pt-40 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:pt-0">
            <div>
              <Etiqueta>Serviços</Etiqueta>

              <MaskTitle
                lines={["Nossos", "serviços"]}
                className="display mt-7 text-[clamp(2.8rem,7vw,5rem)] text-bone"
              />

              <Reveal delay={0.15}>
                <p className="mt-7 max-w-md text-base leading-relaxed text-ash">
                  Cada serviço é executado com precisão, técnica e o tempo
                  necessário para um resultado impecável. Sem pressa, sem
                  atalhos. Tempo reservado só para você.
                </p>

                <div className="mt-8">
                  <Botao href={negocio.linkAgendamento}>
                    Reservar meu horário
                  </Botao>
                </div>

                <p className="mt-5 max-w-xs text-xs leading-relaxed text-ash/70">
                  Valores informados no atendimento e na tela de agendamento.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* A altura extra é o curso de scroll que faz os grupos trocarem. */}
        <div ref={ref} className="relative h-[400svh]">
          <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
            <div className="relative h-[24rem] sm:h-[26rem]">
              {grupos.map((grupo, i) => (
                <GrupoServicos
                  key={grupo.id}
                  grupo={grupo}
                  indice={i}
                  progresso={scrollYProgress}
                />
              ))}
            </div>

            <div className="mt-8 flex gap-2">
              {grupos.map((grupo, i) => (
                <TrilhaCapitulo
                  key={grupo.id}
                  progresso={scrollYProgress}
                  indice={i}
                  total={TOTAL}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
