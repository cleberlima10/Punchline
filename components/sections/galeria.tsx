"use client";

import Image from "next/image";
import { galeria, negocio } from "@/lib/content";
import { useMediaQuery } from "@/lib/use-media-query";
import { Botao, Etiqueta, Secao } from "@/components/ui";
import { MaskTitle, Parallax, Reveal } from "@/components/motion-primitives";

/**
 * Galeria em mosaico com profundidade — colunas em velocidades diferentes,
 * alturas variadas, fotos emergindo conforme o scroll. Não é um grid simples.
 *
 * São trabalhos reais de clientes da Punchline, em preto e branco conforme
 * `specs/design.md` › Direção Fotográfica.
 */
const alturas: Record<string, string> = {
  tall: "aspect-[3/4.4]",
  wide: "aspect-[4/3]",
  normal: "aspect-square",
};

/** Velocidades de parallax por coluna. Sinais alternados criam a profundidade. */
const velocidades = [70, -40, 100];

export function Galeria() {
  // Três colunas no desktop, duas no celular. A distribuição é feita aqui, e
  // não escondendo a terceira coluna com CSS: esconder tiraria um terço dos
  // trabalhos justamente de quem mais acessa pelo telefone.
  const tresColunas = useMediaQuery("(min-width: 768px)");
  const total = tresColunas ? 3 : 2;

  const colunas = Array.from({ length: total }, (_, c) =>
    galeria.filter((_, i) => i % total === c),
  );

  return (
    <Secao id="galeria" className="overflow-hidden bg-ink">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Etiqueta>Galeria</Etiqueta>
          <MaskTitle
            lines={["Feito", "na cadeira."]}
            className="display mt-7 text-[clamp(2.8rem,7.5vw,5.6rem)] text-bone"
          />
        </div>

        <Reveal delay={0.15} className="max-w-sm">
          <p className="text-base leading-relaxed text-ash">
            Cortes e barbas finalizados aqui dentro. Passe o olho: é o mesmo
            acabamento que espera por você.
          </p>
          <div className="mt-7">
            <Botao href={negocio.linkAgendamento} variante="secundario">
              Quero o meu
            </Botao>
          </div>
        </Reveal>
      </div>

      {/* O número de colunas vem do JS, que também distribui as fotos. O grid
          segue esse número em vez de usar breakpoint do CSS: se os dois
          discordassem, a coluna sobrando quebraria para a linha de baixo. */}
      <div
        className="mt-16 grid gap-4 md:gap-6"
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
      >
        {colunas.map((coluna, ci) => (
          <Parallax key={ci} speed={velocidades[ci]}>
            <div className="flex flex-col gap-4 md:gap-6">
              {coluna.map((foto, fi) => (
                <Reveal
                  key={foto.src}
                  delay={fi * 0.06}
                  y={38}
                  className={`group relative overflow-hidden rounded-xl border border-hairline ${
                    alturas[foto.span] ?? alturas.normal
                  }`}
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="grade-people object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-ink/20 transition-opacity duration-700 group-hover:opacity-0" />
                </Reveal>
              ))}
            </div>
          </Parallax>
        ))}
      </div>
    </Secao>
  );
}
