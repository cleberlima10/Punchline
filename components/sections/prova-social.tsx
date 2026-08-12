"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { clientesAtendidos, depoimentos } from "@/lib/content";
import { Etiqueta, Preencher, Secao } from "@/components/ui";
import { MaskTitle, Reveal } from "@/components/motion-primitives";

function Estrelas() {
  return (
    <div className="flex gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-sm text-gold">
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * Formata o número do contador em escala legível.
 *
 * Dez mil em algarismos ("10000") fica ilegível em corpo gigante, e com
 * separador ("10.000") o ponto some no meio dos dígitos. Acima de mil o número
 * passa a ser exibido em milhares — durante a contagem com uma casa decimal,
 * para a animação não pular de "3 mil" para "4 mil" aos trancos.
 */
function formatar(valor: number) {
  if (valor < 1000) return String(valor);
  const milhares = valor / 1000;
  const casas = milhares < 10 ? 1 : 0;
  return `${milhares.toFixed(casas).replace(".", ",")} mil`;
}

/**
 * Contador que sobe até o alvo quando o bloco entra em cena.
 * Dispara uma única vez. Com movimento reduzido, mostra o número final direto.
 */
function Contador({ alvo, sufixo }: { alvo: number; sufixo: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const emCena = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!emCena) return;

    if (reduced) {
      setValor(alvo);
      return;
    }

    const controls = animate(0, alvo, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValor(Math.round(v)),
    });

    return () => controls.stop();
  }, [emCena, alvo, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {/* O número final fica sempre no HTML, para leitor de tela e para o
          Google. O contador animado é decorativo. Sem isso, quem lê a página
          sem JavaScript veria "0 clientes atendidos". */}
      <span className="sr-only">{clientesAtendidos.rotuloAcessivel}</span>
      <span aria-hidden>
        {formatar(valor)}
        {valor >= alvo ? sufixo : ""}
      </span>
    </span>
  );
}

export function ProvaSocial() {
  return (
    <Secao id="avaliacoes" className="bg-ink">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
        <div>
          <Etiqueta>Reputação</Etiqueta>
          <MaskTitle
            lines={["Quem conhece", "reconhece"]}
            className="display mt-7 text-[clamp(2.8rem,7.5vw,5.6rem)] text-bone"
          />
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ash">
              A experiência de quem já passou por aqui é o melhor retrato do
              nosso trabalho.
            </p>
          </Reveal>
        </div>

        {/* O número em escala editorial: a prova social sem texto no caminho */}
        <Reveal delay={0.1}>
          <div className="card-glass relative overflow-hidden rounded-2xl p-9 sm:p-12">
            <p className="eyebrow">{clientesAtendidos.rotulo}</p>

            <div className="mt-5">
              <span className="display block text-[clamp(4.5rem,14vw,9rem)] leading-[0.8] text-bone">
                <Contador
                  alvo={clientesAtendidos.alvo}
                  sufixo={clientesAtendidos.sufixo}
                />
              </span>
            </div>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ash">
              Cadeiras ocupadas, cortes entregues e gente que voltou.
            </p>

            {/* Brilho sutil, sem piscar */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/[0.07] blur-3xl"
            />
          </div>
        </Reveal>
      </div>

      {/*
        Depoimentos com altura igual.

        Os textos reais têm tamanhos muito diferentes — o primeiro é três vezes
        maior que os outros — e com altura automática o rodapé dos cards ficava
        irregular. Aqui todos esticam até a altura do maior e a assinatura é
        empurrada para a base, então as três linhas de baixo se alinham.
        O respiro que sobra nos cards curtos é intencional e está de acordo com
        `specs/design.md` › Layout.
      */}
      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {depoimentos
          ? depoimentos.map((d, i) => (
              <Reveal
                key={d.autor}
                delay={i * 0.08}
                className="card-glass flex h-full flex-col rounded-2xl p-8"
              >
                <Estrelas />
                <p className="mt-5 text-sm leading-relaxed text-bone/90">
                  “{d.texto}”
                </p>
                <p className="mt-auto pt-8 text-[0.7rem] uppercase tracking-[0.18em] text-ash">
                  {d.autor} · {d.origem}
                </p>
              </Reveal>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className="card-glass flex h-full flex-col rounded-2xl p-8"
              >
                <Estrelas />
                <p className="mt-5 text-sm leading-relaxed">
                  <Preencher>depoimento real {i + 1}</Preencher>
                </p>
              </Reveal>
            ))}
      </div>
    </Secao>
  );
}
