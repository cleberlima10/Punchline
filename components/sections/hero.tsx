"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero, negocio } from "@/lib/content";
import { useMediaQuery } from "@/lib/use-media-query";
import { Botao } from "@/components/ui";
import { Reveal } from "@/components/motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // No celular a primeira dobra mostra só a provocação de abertura. Os outros
  // dois parágrafos e o remate continuam logo abaixo, fora da dobra: com os
  // quatro blocos ali, o texto tomava a tela inteira e a fotografia sumia.
  const dobraCurta = !useMediaQuery("(min-width: 1024px)");
  const naDobra = dobraCurta ? hero.manifesto.slice(0, 1) : hero.manifesto;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // A imagem sobe mais devagar que o conteúdo e escurece conforme sai de cena.
  const imagemY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imagemEscala = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const conteudoY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const conteudoOpacidade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  // Véu mais leve no celular — com menos texto na frente, a foto pode aparecer.
  const veu = useTransform(
    scrollYProgress,
    [0, 1],
    [dobraCurta ? 0.3 : 0.42, 0.9],
  );

  return (
    <>
      <section
        ref={ref}
        id="topo"
        className="relative flex min-h-[100svh] items-end overflow-hidden"
      >
      {/* Camada 1 — fotografia */}
      <motion.div
        className="absolute inset-0 -z-30"
        style={reduced ? undefined : { y: imagemY, scale: imagemEscala }}
      >
        <Image
          src="/images/cadeira-hero.webp"
          alt="Cadeira de barbeiro clássica restaurada na Punchline Barbearia"
          fill
          priority
          sizes="100vw"
          className="grade-room object-cover object-center"
        />
      </motion.div>

      {/* Camada 2 — véu que aprofunda a imagem e garante contraste do texto */}
      <motion.div
        className="absolute inset-0 -z-20 bg-ink"
        style={reduced ? { opacity: 0.6 } : { opacity: veu }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_15%,transparent_10%,rgba(15,15,15,0.75)_70%,#0F0F0F_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-ink to-transparent sm:h-64" />

      {/* Camada 3 — conteúdo */}
      <motion.div
        // pb maior no celular: é o espaço que o indicador de scroll ocupa
        // embaixo. Com pb-24 o "Role" encostava no botão secundário.
        className="relative mx-auto w-full max-w-[1320px] px-6 pb-28 pt-28 sm:px-10 sm:pb-32 sm:pt-40 lg:px-16"
        style={reduced ? undefined : { y: conteudoY, opacity: conteudoOpacidade }}
      >
        {/* O título principal não aparece na tela — o hero é conduzido pela
            fotografia. O H1 continua existindo para o Google e para o leitor
            de tela, que precisam saber do que a página trata. */}
        <h1 className="sr-only">{hero.tituloAcessivel}</h1>

        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-gold" aria-hidden />
              <span className="eyebrow">{hero.eyebrow}</span>
            </motion.div>

            {/* Manifesto em parágrafos. Corpo menor que uma subheadline comum
                porque são ~120 palavras: no tamanho anterior não caberia na
                primeira dobra de um celular. */}
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-bone/85 sm:mt-6 sm:space-y-3.5 sm:text-base">
              {naDobra.map((paragrafo, i) => (
                <motion.p
                  key={i}
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, y: 18, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.09,
                    ease: EASE,
                  }}
                >
                  {paragrafo}
                </motion.p>
              ))}

              {/* A punchline da Punchline. Dourada, porque é o remate.
                  No celular ela desce junto com os parágrafos que saíram da
                  dobra — a piada precisa vir depois da preparação. */}
              {!dobraCurta && (
                <motion.p
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: EASE }}
                  className="!mt-5 font-medium text-gold sm:!mt-6"
                >
                  {hero.remate}
                </motion.p>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <Botao
              href={negocio.linkAgendamento}
              pendencia="link de agendamento"
            >
              {hero.ctaPrimario}
            </Botao>
            <Botao href="#experiencia" variante="secundario">
              {hero.ctaSecundario}
            </Botao>
          </motion.div>
        </div>
      </motion.div>

      {/* Camada 4 — indicador de scroll. Em todas as telas: no celular é onde
          ele mais serve, porque a dobra é quase toda fotografia e nada indica
          que a página continua. Um pouco menor no mobile. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 sm:bottom-7 sm:gap-3"
      >
        <span className="text-[0.55rem] font-medium uppercase tracking-[0.3em] text-ash sm:text-[0.6rem]">
          Role
        </span>
        <span className="relative block h-9 w-px overflow-hidden bg-white/15 sm:h-12">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/3 bg-gold"
            animate={{ y: ["-100%", "300%"] }}
            transition={{
              duration: 2.1,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.3,
            }}
          />
        </span>
      </motion.div>
      </section>

      {/* Continuação do manifesto no celular. O que saiu da primeira dobra
          aparece aqui, logo abaixo, fechando com a punchline em dourado. */}
      {dobraCurta && (
        <div className="bg-ink px-6 pb-16 pt-14 sm:px-10">
          <div className="mx-auto max-w-xl space-y-3 text-sm leading-relaxed text-bone/85">
            {hero.manifesto.slice(1).map((paragrafo, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{paragrafo}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="!mt-6 font-medium text-gold">{hero.remate}</p>
            </Reveal>
          </div>
        </div>
      )}
    </>
  );
}
