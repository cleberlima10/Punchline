"use client";

import Image from "next/image";
import { negocio } from "@/lib/content";
import { Botao, Etiqueta, Preencher, Secao } from "@/components/ui";
import { MaskTitle, Reveal } from "@/components/motion-primitives";

export function Localizacao() {
  return (
    <Secao id="localizacao" className="relative overflow-hidden bg-surface">
      {/* Ambiente real como camada de fundo, muito escurecida */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/ambiente-04.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="grade-backdrop object-cover"
        />
        <div className="absolute inset-0 bg-surface/90" />
      </div>

      <Etiqueta>Onde estamos</Etiqueta>

      <div className="mt-7 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <MaskTitle
            lines={[negocio.cidade, negocio.estado]}
            className="display text-[clamp(3rem,9vw,7rem)] text-bone"
          />

          <Reveal delay={0.14} className="mt-8 max-w-md">
            <p className="text-base leading-relaxed text-ash">
              {negocio.endereco}
              <br />
              {negocio.bairro} — {negocio.cidade}/{negocio.estado}
              <br />
              CEP {negocio.cep}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Botao href={negocio.linkMapa} variante="secundario">
                Abrir no mapa
              </Botao>
              <Botao
                href={negocio.linkAgendamento}
                pendencia="link de agendamento"
              >
                Agendar antes de vir
              </Botao>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="card-glass rounded-2xl p-8 sm:p-10">
            <p className="eyebrow">Horário de funcionamento</p>

            <ul className="mt-6 space-y-0">
              {negocio.horarios ? (
                negocio.horarios.map((h) => (
                  <li
                    key={h.dias}
                    className="flex items-center justify-between border-b border-hairline py-4 text-sm last:border-0"
                  >
                    <span className="text-ash">{h.dias}</span>
                    <span className="font-medium text-bone">{h.horas}</span>
                  </li>
                ))
              ) : (
                <li className="border-b border-hairline py-4 text-sm">
                  <Preencher>
                    horário de funcionamento por dia da semana
                  </Preencher>
                </li>
              )}
            </ul>

            <div className="mt-8 space-y-4 border-t border-hairline pt-8">
              {/* Sem telefone fixo: o contato da Punchline é só por WhatsApp. */}
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-ash">WhatsApp</span>
                <a
                  href={negocio.linkWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-bone transition-colors duration-400 hover:text-gold"
                >
                  (51) 99970-2013
                </a>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-ash">Instagram</span>
                <a
                  href={negocio.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-bone transition-colors duration-400 hover:text-gold"
                >
                  {negocio.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Secao>
  );
}
