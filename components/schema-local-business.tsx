import { curso, equipe, grupos, negocio } from "@/lib/content";

/**
 * JSON-LD da página, emitido como um `@graph` único.
 *
 * Três tipos, todos com respaldo em conteúdo que existe na página:
 *
 * - **HairSalon** — o negócio em si. Subtipo de LocalBusiness, mais específico
 *   que "Organization" e é o que o Google usa para resultados locais: mapa,
 *   horário, botão de rota.
 * - **WebSite** — identifica o site e seu editor. Amarra as duas entidades por
 *   `@id` em vez de repetir os dados do negócio.
 * - **Course** — a Punchline dá curso de barbeiro, e isso é uma oferta
 *   distinta do serviço de barbearia. Sem `offers` nem `hasCourseInstance`:
 *   preço, formato e datas não foram informados.
 *
 * Um `@graph` só, num único bloco: dois `<script>` de JSON-LD descrevendo o
 * mesmo negócio viram entidades duplicadas aos olhos do Google.
 *
 * Só entram campos com dado real. **Sem `aggregateRating`:** a Punchline
 * informa clientes atendidos, não nota média nem número de avaliações — emitir
 * rating sem esses dois valores seria inventar prova social.
 */

/** Google exige o formato abreviado em inglês nos horários. */
const DIA_SCHEMA: Record<string, string> = {
  "Segunda-feira": "Monday",
  "Terça-feira": "Tuesday",
  "Quarta-feira": "Wednesday",
  "Quinta-feira": "Thursday",
  "Sexta-feira": "Friday",
  Sábado: "Saturday",
  Domingo: "Sunday",
};

export function SchemaLocalBusiness() {
  const idNegocio = `${negocio.dominio}/#barbearia`;
  const idSite = `${negocio.dominio}/#site`;

  const schema: Record<string, unknown> = {
    "@type": "HairSalon",
    "@id": idNegocio,
    name: "Punchline Barbearia",
    // Com barra no fim, igual à canonical: o projeto usa `trailingSlash: true`,
    // e declarar as duas formas faria o Google ver dois endereços.
    description:
      "Barbearia clássica em Nova Santa Rita, RS. Corte masculino, barba na navalha e atendimento personalizado.",
    url: `${negocio.dominio}/`,
    image: `${negocio.dominio}/images/og.jpg`,
    priceRange: "$$",
    currenciesAccepted: "BRL",
    telephone: `+${negocio.whatsapp}`,
    hasMap: negocio.linkMapa,
    areaServed: {
      "@type": "City",
      name: `${negocio.cidade}, ${negocio.estado}`,
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: negocio.linkAgendamento,
        inLanguage: "pt-BR",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Agendamento de horário" },
    },
  };

  // Equipe. Nomes e funções reais — ajuda o Google a associar os barbeiros ao
  // negócio em buscas locais.
  schema.employee = equipe.map((b) => ({
    "@type": "Person",
    name: b.nome,
    jobTitle: b.papel,
    image: `${negocio.dominio}${b.foto}`,
  }));

  // Catálogo de serviços. Sem `price` em lugar nenhum: o cliente decidiu não
  // exibir valores, e Offer com preço inventado seria declaração falsa.
  schema.hasOfferCatalog = {
    "@type": "OfferCatalog",
    name: "Serviços da Punchline Barbearia",
    itemListElement: grupos.map((grupo) => ({
      "@type": "OfferCatalog",
      name: grupo.titulo,
      itemListElement: grupo.itens.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.nome,
          ...(item.detalhe ? { description: item.detalhe } : {}),
        },
      })),
    })),
  };

  schema.address = {
    "@type": "PostalAddress",
    streetAddress: negocio.endereco,
    addressLocality: negocio.cidade,
    addressRegion: negocio.estado,
    postalCode: negocio.cep,
    addressCountry: "BR",
  };

  const redes = [negocio.instagram, negocio.linkMapa].filter(Boolean);
  if (redes.length) schema.sameAs = redes;

  if (negocio.horarios?.length) {
    schema.openingHoursSpecification = negocio.horarios.map((h) => {
      const [abre, fecha] = h.horas.split("—").map((s) => s.trim());
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DIA_SCHEMA[h.dias] ?? h.dias,
        opens: abre,
        closes: fecha,
      };
    });
  }

  const site = {
    "@type": "WebSite",
    "@id": idSite,
    url: `${negocio.dominio}/`,
    name: "Punchline Barbearia",
    inLanguage: "pt-BR",
    publisher: { "@id": idNegocio },
  };

  const cursoSchema = {
    "@type": "Course",
    name: `${curso.titulo.join(" ")} — curso de barbeiro`,
    description: curso.paragrafos.join(" "),
    inLanguage: "pt-BR",
    url: `${negocio.dominio}/#curso`,
    provider: { "@id": idNegocio },
  };

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [schema, site, cursoSchema],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo) }}
    />
  );
}
