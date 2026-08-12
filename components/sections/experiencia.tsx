"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Etiqueta } from "@/components/ui";
import { TrilhaCapitulo, useCapitulo } from "@/components/motion-primitives";

/**
 * Sticky narrativa. O bloco é fixado e os capítulos trocam durante o scroll,
 * construindo a resposta para "por que escolher a Punchline?" em três atos.
 * Referência de comportamento: Apple / Stripe / Amphora.
 */
const capitulos = [
  {
    numero: "01",
    titulo: "A cadeira",
    texto:
      "Nossos profissionais trabalham em cadeiras de altíssimo padrão, algumas verdadeiras peças de história, datadas da década de 1950. Ferro fundido, couro legítimo e detalhes ricos em cada acabamento. Mais do que cadeiras, são peças que carregam a tradição e a essência da barbearia clássica. Porque, para nós, cada detalhe importa.",
    imagem: "/images/cadeira-01.webp",
    alt: "Cadeira de barbeiro antiga restaurada, em detalhe",
  },
  {
    numero: "02",
    titulo: "A técnica",
    texto:
      "Tesouras, navalhas e máquinas. Para um bom profissional, ferramentas são apenas uma extensão da técnica. Com domínio, precisão e experiência, é possível executar qualquer corte, usando aquilo que realmente importa: habilidade. E, quando se trata de ferramentas, acredite: nós trabalhamos com algumas das melhores.",
    imagem: "/images/ferramentas-01.webp",
    alt: "Navalhas, tesouras e pincel sobre a bancada",
  },
  {
    numero: "03",
    titulo: "O tempo",
    texto:
      "O papel do barbeiro é dar forma àquilo que cresce sem forma. Tudo que é feito às pressas tende a ser passageiro. Já aquilo que é bem construído exige tempo, técnica e atenção aos detalhes. Na barbearia, cada corte é pensado para durar, crescer bem e manter sua forma por mais tempo. Sente-se, converse com seu barbeiro e deixe o tempo fazer parte do processo. Porque um bom corte não precisa apenas parecer bom hoje. Ele precisa continuar bom amanhã.",
    imagem: "/images/cadeira-03.webp",
    alt: "Detalhe em cromado do braço da cadeira de barbeiro",
  },
];

const TOTAL = capitulos.length;

function ImagemCapitulo({
  capitulo,
  indice,
  progresso,
}: {
  capitulo: (typeof capitulos)[number];
  indice: number;
  progresso: MotionValue<number>;
}) {
  const { opacidade, visibility, pontos } = useCapitulo(progresso, indice, TOTAL);
  const escala = useTransform(progresso, [pontos[0], pontos[3]], [1.12, 1]);

  return (
    <motion.div
      style={{ opacity: opacidade, scale: escala, visibility }}
      className="absolute inset-0 overflow-hidden rounded-2xl border border-hairline"
    >
      <Image
        src={capitulo.imagem}
        alt={capitulo.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="grade-detail object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
    </motion.div>
  );
}

function TextoCapitulo({
  capitulo,
  indice,
  progresso,
}: {
  capitulo: (typeof capitulos)[number];
  indice: number;
  progresso: MotionValue<number>;
}) {
  const { opacidade, y, visibility } = useCapitulo(progresso, indice, TOTAL);

  return (
    <motion.div
      style={{ opacity: opacidade, y, visibility }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      {/* Número e título encolheram quando os textos dos capítulos passaram de
          duas linhas para cinco: com o tamanho anterior o capítulo 03
          transbordava o bloco fixo. */}
      <span className="display text-[3rem] leading-none text-gold/25 sm:text-[4rem]">
        {capitulo.numero}
      </span>
      <h3 className="display mt-1 text-[clamp(2rem,4.5vw,3.2rem)] text-bone">
        {capitulo.titulo}
      </h3>
      <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ash sm:text-base">
        {capitulo.texto}
      </p>
    </motion.div>
  );
}

export function Experiencia() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} id="experiencia" className="relative h-[320svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-6 sm:px-10 lg:px-16">
        {/* Fundo: ambiente real, muito escurecido — camada de profundidade */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/ambiente-02.webp"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="grade-backdrop scale-110 object-cover"
          />
          <div className="absolute inset-0 bg-ink/85" />
        </div>

        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Etiqueta>A experiência Punchline</Etiqueta>

            <div className="relative mt-8 h-[24rem] sm:h-[27rem] lg:h-[27rem]">
              {capitulos.map((c, i) => (
                <TextoCapitulo
                  key={c.numero}
                  capitulo={c}
                  indice={i}
                  progresso={scrollYProgress}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {capitulos.map((c, i) => (
                <TrilhaCapitulo
                  key={c.numero}
                  progresso={scrollYProgress}
                  indice={i}
                  total={TOTAL}
                />
              ))}
            </div>

            {/* Imagens no celular: mesmas do desktop e trocando junto com o
                texto, só que abaixo dele. Recorte 16/9 porque é o que sobra de
                altura depois do texto num iPhone SE — medido, não chutado.
                As imagens do desktop ficam em `display:none` aqui, então o
                navegador não chega a baixá-las duas vezes. */}
            <div className="relative mt-6 aspect-[16/9] lg:hidden">
              {capitulos.map((c, i) => (
                <ImagemCapitulo
                  key={c.numero}
                  capitulo={c}
                  indice={i}
                  progresso={scrollYProgress}
                />
              ))}
            </div>
          </div>

          <div className="relative hidden h-[32rem] lg:block">
            {capitulos.map((c, i) => (
              <ImagemCapitulo
                key={c.numero}
                capitulo={c}
                indice={i}
                progresso={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
