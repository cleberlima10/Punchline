"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Curva única de todo o projeto. Nada elástico, nada com bounce. */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================================================
   Reveal — fade + blur + deslocamento. O bloco base de todo scroll reveal.
   ========================================================================== */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = 8,
  className,
  /**
   * Margem do gatilho. O padrão dispara assim que o bloco entra em cena.
   * Valores mais fechados (ex.: "-30% 0px -30% 0px") só disparam quando o
   * bloco chega perto do meio da tela — usado para escalonar listas longas,
   * fazendo um item aparecer de cada vez conforme o scroll avança.
   */
  margin = "-12% 0px -12% 0px",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  className?: string;
  margin?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, y, filter: `blur(${blur}px)` }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{
        once: true,
        margin: margin as `${number}% ${number}px ${number}% ${number}px`,
      }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   MaskTitle — títulos display revelados linha a linha, por baixo de máscara.
   Cada linha entra com um leve atraso, criando o ritmo editorial.
   ========================================================================== */
export function MaskTitle({
  lines,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const reduced = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // O padding-top compensado por margem negativa abre espaço para os
        // acentos do português (Ã, É, Ç) — sem ele a máscara os decapita.
        <span
          key={line + i}
          className="-mt-[0.18em] block overflow-hidden pb-[0.08em] pt-[0.18em]"
        >
          <motion.span
            className="block"
            initial={reduced ? { opacity: 0 } : { y: "108%" }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 1.05,
              delay: delay + i * 0.09,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ==========================================================================
   Parallax — camadas em velocidades diferentes.
   `speed` positivo sobe mais devagar que o scroll, negativo sobe mais rápido.
   ========================================================================== */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   Capítulos de scroll — usados nas seções sticky (Experiência, Serviços).
   Um bloco por vez: entra, permanece, sai, e o próximo assume.
   ========================================================================== */

/**
 * Janela de scroll de um capítulo. Duas regras, ambas descobertas na marra:
 *
 * 1. Os quatro pontos precisam ficar dentro de [0, 1] e em ordem crescente. O
 *    Framer Motion repassa esse intervalo como offsets de keyframe para a Web
 *    Animations API, que rejeita offset negativo ou maior que 1.
 * 2. A janela não pode transbordar a própria fatia. Se transbordar, dois ou
 *    três capítulos ficam visíveis ao mesmo tempo e os textos se sobrepõem.
 */
export function janelaCapitulo(
  indice: number,
  total: number,
  margemRelativa = 0.22,
): [number, number, number, number] {
  const fatia = 1 / total;
  const margem = fatia * margemRelativa;
  const primeiro = indice === 0;
  const ultimo = indice === total - 1;
  const inicio = indice * fatia;
  const fim = inicio + fatia;

  return [
    primeiro ? 0 : inicio,
    primeiro ? 0.0001 : inicio + margem,
    ultimo ? 0.9999 : fim - margem,
    ultimo ? 1 : fim,
  ];
}

/**
 * Estado visual de um capítulo em função do progresso do scroll.
 *
 * A visibilidade acompanha a opacidade de propósito: como os capítulos ficam
 * empilhados em `absolute inset-0`, opacidade sozinha deixa resíduo legível
 * por baixo do próximo. Zerar a visibilidade também tira o capítulo inativo da
 * árvore de acessibilidade, para o leitor de tela não anunciar todos de uma
 * vez.
 */
export function useCapitulo(
  progresso: MotionValue<number>,
  indice: number,
  total: number,
  deslocamento = 28,
) {
  const primeiro = indice === 0;
  const ultimo = indice === total - 1;
  const pontos = janelaCapitulo(indice, total);

  const opacidade = useTransform(progresso, pontos, [
    primeiro ? 1 : 0,
    1,
    1,
    ultimo ? 1 : 0,
  ]);

  const y = useTransform(progresso, pontos, [
    primeiro ? 0 : deslocamento,
    0,
    0,
    ultimo ? 0 : -deslocamento,
  ]);

  const visibility = useTransform(opacidade, (v) =>
    v < 0.03 ? "hidden" : "visible",
  );

  return { opacidade, y, visibility, pontos };
}

/** Trilha de progresso de um capítulo, usada como indicador da narrativa. */
export function TrilhaCapitulo({
  progresso,
  indice,
  total,
}: {
  progresso: MotionValue<number>;
  indice: number;
  total: number;
}) {
  const fatia = 1 / total;
  const escalaX = useTransform(
    progresso,
    [indice * fatia, (indice + 1) * fatia],
    [0, 1],
  );

  return (
    <span className="relative h-px flex-1 overflow-hidden bg-white/10">
      <motion.span
        className="absolute inset-0 block origin-left bg-gold"
        style={{ scaleX: escalaX }}
      />
    </span>
  );
}

/* ==========================================================================
   ScaleReveal — a imagem entra levemente ampliada e assenta no lugar.
   ========================================================================== */
export function ScaleReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
