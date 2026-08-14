"use client";

/**
 * Eventos de conversão para o Google Analytics.
 *
 * Sem isto, o relatório mostra visitas e tempo de página — e nada sobre o que
 * o site existe para fazer, que é gerar agendamento. Com isto dá para
 * responder "quantas pessoas clicaram em agendar neste mês" e, no GA, marcar
 * esses eventos como principais.
 *
 * Os nomes estão em português de propósito: quem vai ler o relatório é o dono
 * da barbearia, não um analista.
 *
 * Silencioso por natureza: se o Analytics não carregou — bloqueador de
 * anúncios, rede ruim, ID ausente — a função não faz nada e o clique segue
 * normalmente. Medição nunca pode atrapalhar a navegação.
 */

type Gtag = (
  comando: "event",
  nome: string,
  parametros?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

/** Descobre que tipo de ação o link representa, pelo destino. */
export function eventoDoLink(href: string): string | null {
  if (href.includes("appbarber")) return "agendamento_clique";
  if (href.includes("whatsapp") || href.includes("wa.me"))
    return "whatsapp_clique";
  if (href.includes("instagram")) return "instagram_clique";
  if (href.includes("maps.app.goo.gl") || href.includes("google.com/maps"))
    return "mapa_clique";
  return null;
}

/**
 * Registra o evento, se houver Analytics na página.
 *
 * `origem` diz de qual botão veio — o site tem vários CTAs de agendamento, e
 * saber qual converte mais é o que permite melhorar a página depois.
 */
export function registrarEvento(href: string, origem: string) {
  const nome = eventoDoLink(href);
  if (!nome || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", nome, { origem });
}
