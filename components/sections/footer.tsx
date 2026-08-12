"use client";

import { negocio } from "@/lib/content";
import { irParaSecao } from "@/lib/ir-para-secao";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    // O id é observado pelo CTA flutuante, que se recolhe ao chegar aqui
    // para não cobrir os links de Instagram, WhatsApp e Mapa.
    <footer
      id="rodape"
      className="hairline-t bg-ink px-6 py-14 sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display text-3xl tracking-[0.14em] text-bone">
              Punchline
            </p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.4em] text-ash">
              Barbearia
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ash">
              Barbearia clássica em {negocio.cidade} — {negocio.estado}.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Rodapé">
            {[
              { rotulo: "Experiência", href: "#experiencia" },
              { rotulo: "Serviços", href: "#servicos" },
              { rotulo: "Barbeiros", href: "#barbeiros" },
              { rotulo: "História", href: "#historia" },
              { rotulo: "Galeria", href: "#galeria" },
              { rotulo: "Curso", href: "#curso" },
              { rotulo: "Avaliações", href: "#avaliacoes" },
              { rotulo: "Onde estamos", href: "#localizacao" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  irParaSecao(item.href);
                }}
                className="text-[0.72rem] uppercase tracking-[0.16em] text-ash transition-colors duration-400 hover:text-gold"
              >
                {item.rotulo}
              </a>
            ))}
          </nav>
        </div>

        <div className="rule-gold mt-12" />

        <div className="mt-8 flex flex-col gap-4 text-[0.7rem] text-ash md:flex-row md:items-center md:justify-between">
          <p>
            © {ano} Punchline Barbearia. Todos os direitos reservados.
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={negocio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.16em] transition-colors duration-400 hover:text-gold"
            >
              Instagram
            </a>
            <a
              href={negocio.linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.16em] transition-colors duration-400 hover:text-gold"
            >
              WhatsApp
            </a>
            <a
              href={negocio.linkMapa}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.16em] transition-colors duration-400 hover:text-gold"
            >
              Mapa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
