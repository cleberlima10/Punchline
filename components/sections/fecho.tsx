"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { negocio } from "@/lib/content";
import { Botao } from "@/components/ui";
import { MaskTitle } from "@/components/motion-primitives";

/** Fecho full-bleed. Uma frase, um CTA. É o último empurrão para o agendamento. */
export function Fecho() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const escala = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        style={reduced ? undefined : { y, scale: escala }}
      >
        <Image
          src="/images/cadeira-05.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="grade-room object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-ink/80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_50%,transparent,rgba(15,15,15,0.9))]" />

      <div className="relative w-full max-w-[1320px] px-6 text-center sm:px-10 lg:px-16">
        <MaskTitle
          lines={["A cadeira", "está pronta."]}
          className="display text-[clamp(3rem,11vw,9rem)] text-bone"
        />

        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-ash"
        >
          Escolha o horário, apareça e deixe o resto com a gente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex flex-wrap items-center justify-center gap-3"
        >
          <Botao href={negocio.linkAgendamento} pendencia="link de agendamento">
            Agendar meu horário
          </Botao>
          <Botao href="#servicos" variante="secundario">
            Ver serviços
          </Botao>
        </motion.div>
      </div>
    </section>
  );
}
