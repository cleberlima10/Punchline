"use client";

import Image from "next/image";
import { curso, negocio } from "@/lib/content";
import { Botao, Etiqueta, Secao } from "@/components/ui";
import { MaskTitle, Parallax, Reveal, ScaleReveal } from "@/components/motion-primitives";

/**
 * Curso de barbeiro.
 *
 * Público diferente do resto da página: aqui não é o cliente que quer cortar o
 * cabelo, é quem quer aprender o ofício. Por isso fica depois dos Produtos —
 * longe do caminho principal, que é o agendamento — e o CTA aponta para o
 * WhatsApp, não para o AppBarber.
 *
 * A foto mostra o barbeiro trabalhando com os certificados na parede ao fundo:
 * é a própria prova de autoridade que a seção precisa.
 */
export function Curso() {
  return (
    <Secao id="curso" className="overflow-hidden bg-ink">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <Etiqueta>{curso.etiqueta}</Etiqueta>

          <MaskTitle
            lines={curso.titulo}
            className="display mt-7 text-[clamp(2.6rem,7vw,5rem)] text-bone"
          />

          <div className="mt-8 max-w-lg space-y-5 text-base leading-relaxed text-ash">
            {curso.paragrafos.map((paragrafo, i) => (
              <Reveal key={i} delay={0.1 + i * 0.07}>
                <p>{paragrafo}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.26} className="mt-9">
            <p className="text-sm text-bone/90">{curso.chamada}</p>
            <div className="mt-5">
              <Botao href={negocio.linkWhatsapp}>{curso.cta}</Botao>
            </div>
          </Reveal>
        </div>

        <Parallax speed={40}>
          <ScaleReveal className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline">
            <Image
              src={curso.foto}
              alt={curso.fotoAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="grade-people object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          </ScaleReveal>
        </Parallax>
      </div>
    </Secao>
  );
}
