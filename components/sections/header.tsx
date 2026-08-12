"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { negocio } from "@/lib/content";
import { Botao } from "@/components/ui";
import { irParaSecao } from "@/lib/ir-para-secao";

const navegacao = [
  { rotulo: "Experiência", href: "#experiencia" },
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Barbeiros", href: "#barbeiros" },
  { rotulo: "História", href: "#historia" },
  { rotulo: "Galeria", href: "#galeria" },
  { rotulo: "Curso", href: "#curso" },
  { rotulo: "Onde estamos", href: "#localizacao" },
];

export function Header() {
  const [compacto, setCompacto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setCompacto(v > 40));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        compacto
          ? "border-b border-hairline bg-ink/80 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-6"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 sm:px-10 lg:px-16">
        <a
          href="#topo"
          onClick={(e) => {
            e.preventDefault();
            irParaSecao("#topo");
          }}
          className="group flex flex-col leading-none"
        >
          <span className="display text-[1.6rem] tracking-[0.14em] text-bone transition-colors duration-500 group-hover:text-gold">
            Punchline
          </span>
          <span className="mt-0.5 text-[0.55rem] font-medium uppercase tracking-[0.42em] text-ash">
            Barbearia
          </span>
        </a>

        {/* Barra completa só a partir de 1280px: com 7 itens, em 1024px o menu
            encostava no logo de um lado e no botão do outro. Abaixo disso o
            hambúrguer dá conta melhor. */}
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Principal">
          {navegacao.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                irParaSecao(item.href);
              }}
              className="group relative text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ash transition-colors duration-400 hover:text-bone"
            >
              {item.rotulo}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Sem marcador aqui: um aviso dentro da barra fixa a deformaria.
              A pendência do link de agendamento já aparece no hero, nos
              serviços, no fecho e no CTA flutuante. */}
          <Botao
            href={negocio.linkAgendamento}
            className="hidden !px-6 !py-3 !text-[0.7rem] sm:inline-flex"
          >
            Agendar
          </Botao>

          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-bone transition-colors duration-400 hover:border-gold/50 xl:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 ${
                  menuAberto ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 ${
                  menuAberto ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-hairline bg-ink/95 backdrop-blur-xl xl:hidden"
            aria-label="Menu móvel"
          >
            <div className="flex flex-col gap-1 px-6 py-6 sm:px-10">
              {navegacao.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuAberto(false);
                    irParaSecao(item.href);
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5 }}
                  className="display border-b border-hairline py-4 text-3xl text-bone transition-colors duration-400 hover:text-gold"
                >
                  {item.rotulo}
                </motion.a>
              ))}
              <Botao
                href={negocio.linkAgendamento}
                pendencia="link de agendamento"
                className="mt-6 w-full"
              >
                Agendar horário
              </Botao>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
