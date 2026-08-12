"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { negocio } from "@/lib/content";

/**
 * CTA persistente. Aparece depois do hero e acompanha o visitante — o contato
 * nunca fica a mais de um toque de distância.
 *
 * Some ao chegar no rodapé: lá embaixo já existem os links de Instagram,
 * WhatsApp e Mapa, e o botão flutuante ficava por cima deles.
 */
export function AgendamentoFlutuante() {
  const [passouDoHero, setPassouDoHero] = useState(false);
  const [noRodape, setNoRodape] = useState(false);

  // Dois observadores em vez de um listener de scroll: o navegador avisa
  // quando o hero sai e quando o rodapé entra, sem cálculo a cada frame.
  useEffect(() => {
    const hero = document.getElementById("topo");
    const rodape = document.getElementById("rodape");

    const observers: IntersectionObserver[] = [];

    if (hero) {
      const obs = new IntersectionObserver(
        ([e]) => setPassouDoHero(!e.isIntersecting),
        { threshold: 0 },
      );
      obs.observe(hero);
      observers.push(obs);
    }

    if (rodape) {
      const obs = new IntersectionObserver(
        ([e]) => setNoRodape(e.isIntersecting),
        // A margem antecipa o recolhimento: o botão sai de cena um pouco
        // antes de o rodapé encostar nele.
        { rootMargin: "0px 0px -40px 0px" },
      );
      obs.observe(rodape);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const href = negocio.linkWhatsapp ?? negocio.linkAgendamento;
  const visivel = passouDoHero && !noRodape;

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar a Punchline no WhatsApp"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-[0_14px_36px_-12px_rgba(201,168,106,0.5)] transition-colors duration-500 hover:bg-bone sm:bottom-7 sm:right-7 sm:px-5 sm:py-3 sm:text-[0.7rem]"
        >
          WhatsApp
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-0.5"
          >
            →
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
