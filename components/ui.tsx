"use client";

import type { ReactNode } from "react";
import { irParaSecao } from "@/lib/ir-para-secao";
import { registrarEvento } from "@/lib/eventos";

/* ==========================================================================
   Preencher — marcador visível de conteúdo pendente.
   Amarelo e tracejado de propósito: é impossível publicar sem notar.
   Cada uso corresponde a uma pendência da tabela em memoria.md.
   ========================================================================== */
export function Preencher({ children }: { children: ReactNode }) {
  return (
    <span className="preencher" data-pendente="true">
      [[PREENCHER: {children}]]
    </span>
  );
}

/* ==========================================================================
   Botões
   ========================================================================== */
type BotaoProps = {
  children: ReactNode;
  href?: string | null;
  variante?: "primario" | "secundario" | "fantasma";
  className?: string;
  pendencia?: string;
  /**
   * De qual bloco da página este botão veio. Vai junto no evento do Analytics:
   * o site tem vários CTAs de agendamento, e saber qual deles converte mais é
   * o que permite melhorar a página depois.
   */
  origem?: string;
};

/** Tudo que sai do domínio abre em nova guia. Âncoras internas, não. */
const EXTERNO = /^(https?:)?\/\//i;

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

const variantes = {
  primario:
    "bg-gold text-ink hover:bg-bone hover:shadow-[0_18px_50px_-12px_rgba(201,168,106,0.45)] hover:-translate-y-0.5",
  secundario:
    "border border-hairline bg-white/[0.04] text-bone backdrop-blur-sm hover:border-gold/50 hover:bg-white/[0.07] hover:-translate-y-0.5",
  fantasma:
    "px-0 text-gold hover:text-bone rounded-none",
} as const;

export function Botao({
  children,
  href,
  variante = "primario",
  className = "",
  pendencia,
  origem = "sem-origem",
}: BotaoProps) {
  const conteudo = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  const classes = `${base} ${variantes[variante]} ${className}`;

  // Sem link real ainda: o botão vira um marcador, nunca um link quebrado.
  // O aviso fica fora da pílula — dentro dela o dourado sobre dourado some.
  if (!href) {
    return (
      <span className="relative inline-flex flex-col items-start gap-1.5">
        <span className={`${classes} cursor-not-allowed opacity-80`}>
          {conteudo}
        </span>
        {pendencia ? (
          <span className="preencher !text-[0.62rem]">
            [[PREENCHER: {pendencia}]]
          </span>
        ) : null}
      </span>
    );
  }

  // Link externo (agendamento, WhatsApp, mapa, Instagram) sempre abre em nova
  // guia: o visitante não perde a landing ao conferir alguma coisa fora dela.
  // Âncoras internas (#servicos, #galeria) continuam na mesma aba.
  if (EXTERNO.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => registrarEvento(href, origem)}
        className={classes}
      >
        {conteudo}
        <span className="sr-only"> (abre em nova guia)</span>
      </a>
    );
  }

  // Âncora interna: mesma rolagem em JS do menu, sem passar pelo roteador do
  // Next — para `#experiencia` o roteador recarregaria a rota à toa.
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        irParaSecao(href);
      }}
      className={classes}
    >
      {conteudo}
    </a>
  );
}

/* ==========================================================================
   Estrutura de seção — mantém o mesmo respiro em toda a página
   ========================================================================== */
export function Secao({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 py-28 sm:px-10 md:py-40 lg:px-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1320px]">{children}</div>
    </section>
  );
}

export function Etiqueta({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-gold/60" aria-hidden />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
