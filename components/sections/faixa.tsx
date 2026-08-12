"use client";

import { motion, useReducedMotion } from "framer-motion";

const itens = [
  "Barbearia clássica",
  "Navalha e toalha quente",
  "Cadeiras restauradas",
  "Acabamento sem pressa",
  "Atendimento com hora marcada",
];

/**
 * Faixa em movimento contínuo entre o hero e a narrativa.
 * Movimento linear e lento — nada de piscar, nada de bounce.
 */
export function Faixa() {
  const reduced = useReducedMotion();
  const sequencia = [...itens, ...itens];

  return (
    <div className="hairline-t border-b border-hairline bg-ink py-6">
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <motion.div
          className="flex shrink-0 items-center gap-14 pr-14"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {[...sequencia, ...sequencia].map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-14">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-ash">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
