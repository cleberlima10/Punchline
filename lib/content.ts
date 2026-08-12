/**
 * Conteúdo central da landing page.
 *
 * Tudo que precisa ser revisado ou preenchido pelo cliente vive aqui — não
 * espalhado pelos componentes. Campos com `null` renderizam um marcador
 * amarelo visível na página. Nenhum dado real foi inventado.
 *
 * Cada `null` corresponde a uma pendência da tabela em memoria.md.
 */

export const negocio = {
  nome: "Punchline Barbearia",
  cidade: "Nova Santa Rita",
  estado: "RS",

  /** Endereço em texto. Grafia mantida como o cliente enviou. */
  endereco: "Helio Fraga de Moraes Sarmento, 184",
  bairro: "Centro",
  cep: "92480-000",

  /** Não há telefone fixo: o contato é só por WhatsApp. */
  whatsapp: "5551999702013",
  linkWhatsapp:
    "https://api.whatsapp.com/send/?phone=5551999702013&text&type=phone_number&app_absent=0",

  /** Sistema de agendamento — é o CTA principal do site. */
  linkAgendamento: "https://sites.appbarber.com.br/punchline-vy4t",

  /** Localização no Google Maps. */
  linkMapa: "https://maps.app.goo.gl/H9MTbDNvJY96k6Xi9?g_st=ic",

  instagram: "https://www.instagram.com/punchlinebr/",
  instagramHandle: "@punchlinebr",

  /**
   * Domínio final, confirmado pelo cliente em 2026-08-12.
   *
   * Alimenta a canonical, o Open Graph, o Twitter card, o sitemap.xml, o
   * robots.txt e todas as URLs absolutas do JSON-LD. É a única fonte desse
   * endereço no projeto — trocar aqui atualiza tudo.
   *
   * Sem barra no final: quem monta as URLs acrescenta quando precisa.
   */
  dominio: "https://punchlines.com.br",

  horarios: [
    { dias: "Segunda-feira", horas: "14:00 — 20:00" },
    { dias: "Terça-feira", horas: "10:00 — 20:00" },
    { dias: "Quarta-feira", horas: "10:00 — 20:00" },
    { dias: "Quinta-feira", horas: "10:00 — 20:00" },
    { dias: "Sexta-feira", horas: "10:00 — 20:00" },
    { dias: "Sábado", horas: "10:00 — 16:00" },
  ] as { dias: string; horas: string }[] | null,
};

/**
 * Contador da prova social. O número sobe até o alvo quando entra em cena.
 * É uma contagem de clientes atendidos, não de avaliações — por isso não
 * alimenta o `aggregateRating` do Schema, que exige nota e nº de reviews.
 */
export const clientesAtendidos = {
  rotulo: "Clientes atendidos",
  alvo: 10000,
  sufixo: "+",
  /** Texto final, para leitor de tela e para quem abre a página sem JavaScript. */
  rotuloAcessivel: "Mais de 10 mil clientes atendidos",
};

/**
 * Google Analytics 4. ID de medição fornecido pelo cliente em 2026-08-12.
 *
 * Fica aqui, e não só em variável de ambiente, de propósito: o build é
 * estático e feito na máquina de quem publica. Se o ID dependesse de um
 * `.env.local` e alguém rodasse `npm run build` sem ele, o site iria ao ar sem
 * medição nenhuma — e em silêncio. ID de medição não é segredo: ele aparece no
 * código-fonte de toda página que usa Analytics.
 *
 * `NEXT_PUBLIC_GA_ID` continua funcionando e tem precedência, para o caso de
 * um ambiente de teste precisar de outra propriedade.
 */
export const analytics = {
  id: "G-7V1V1D7Y3X",
};

export const hero = {
  eyebrow: `${negocio.cidade} — ${negocio.estado}`,
  /**
   * O H1 não aparece na tela: o hero é conduzido pela fotografia, a pedido do
   * cliente. Mas a página precisa de um H1 — sem ele o Google não sabe do que
   * a página trata e o leitor de tela perde o título principal. Por isso este
   * texto existe, visível só para essas duas leituras.
   */
  tituloAcessivel:
    "Punchline Barbearia — barbearia clássica em Nova Santa Rita, RS",
  /**
   * Manifesto da marca. Versão enxuta, reescrita pelo cliente em 2026-08-11:
   * caiu de ~120 para ~60 palavras e voltou a caber em uma tela de celular.
   *
   * A última linha é a piada da casa e ganha destaque em dourado — é
   * literalmente a punchline.
   */
  manifesto: [
    "Se procura um lugar onde tudo seja feito do seu jeito e tratado como um rei, talvez deva procurar outro lugar.",
    "Somos uma barbearia clássica: bom corte, bom café e atendimento de cavalheiros.",
    "Cuidamos do seu cabelo e da sua barba. Suas inseguranças, deixamos para outro profissional.",
  ],
  remate: "E fique tranquilo: você não vai chorar depois do corte.",
  ctaPrimario: "Agendar horário",
  ctaSecundario: "Conhecer a Punchline",
};

/**
 * Serviços — lista real fornecida pelo cliente em 2026-08-05.
 *
 * DECISÃO FIRME: **preço não aparece no site.** Não existe campo de preço aqui
 * de propósito. Quem quiser saber o valor entra em contato ou abre o
 * agendamento — é o que o cliente pediu.
 *
 * O `detalhe` vem do que o próprio cliente escreveu entre parênteses. Nada foi
 * escrito por suposição. Os serviços estão agrupados por tipo para dar conta
 * dos 11 itens sem virar uma lista indigesta; a ordem original era alfabética.
 */
export const grupos = [
  {
    id: "cortes",
    titulo: "Cortes",
    itens: [
      { nome: "Corte", detalhe: null, duracao: "45 min" },
      {
        nome: "Corte com Máquina",
        detalhe: "1 pente em todo o cabelo",
        duracao: "30 min",
      },
      {
        nome: "Corte Social",
        detalhe: "somente 1 pente lateral",
        duracao: "30 min",
      },
      { nome: "Corte Infantil", detalhe: null, duracao: "30 min" },
    ],
  },
  {
    id: "barba",
    titulo: "Barba",
    itens: [
      { nome: "Barba Tradicional", detalhe: null, duracao: "45 min" },
      {
        nome: "Barba Expressa",
        detalhe: "somente com máquina",
        duracao: "30 min",
      },
    ],
  },
  {
    id: "combos",
    titulo: "Corte e Barba",
    itens: [
      { nome: "Corte e Barba Tradicional", detalhe: null, duracao: "75 min" },
      { nome: "Corte e Barba Expressa", detalhe: null, duracao: "60 min" },
      {
        nome: "Corte Social e Barba Tradicional",
        detalhe: null,
        duracao: "60 min",
      },
      {
        nome: "Corte com Máquina e Barba Tradicional",
        detalhe: null,
        duracao: "45 min",
      },
    ],
  },
  {
    id: "acabamento",
    titulo: "Acabamento",
    itens: [{ nome: "Acabamento / Pezinho", detalhe: null, duracao: "15 min" }],
  },
] as {
  id: string;
  titulo: string;
  itens: { nome: string; detalhe: string | null; duracao: string }[];
}[];

/**
 * História da Punchline, escrita pelo próprio Felipe e entregue em 2026-08-06.
 *
 * A seção deixou de ser "Quem está por trás" (retrato do fundador) e passou a
 * contar a trajetória da barbearia. O texto está em primeira pessoa e é
 * assinado — por isso é apresentado como depoimento, não como texto
 * institucional.
 *
 * As formações deixaram de ser uma lista à parte: já estão narradas no texto
 * (Vasilis Serafetinidis em 2024 e a passagem pela maior rede de barbearia
 * clássica do Brasil).
 */
export const historia = {
  autor: "Felipe Cunha",
  papel: "Fundador",
  /**
   * Trocada em 2026-08-11: era o retrato do Felipe, virou o salão com as duas
   * cadeiras antigas. Casa melhor com uma seção que conta a história da
   * barbearia, e não a biografia de uma pessoa. A assinatura dele continua ao
   * final do texto.
   */
  foto: "/images/barbearia-historia.webp",
  fotoAlt:
    "Salão da Punchline com as duas cadeiras de barbeiro antigas restauradas",
  paragrafos: [
    "Comecei a sonhar com a Punchline em setembro de 2021. A barbearia, porém, só se tornou realidade em fevereiro de 2025.",
    "Entre o sonho e a realização, foram anos de estudo, dedicação e aprendizado. Tive a oportunidade de aprender com algumas das minhas maiores referências dentro da profissão e, em 2024, vivi um dos momentos mais importantes dessa trajetória: estudei com o grego Vasilis Serafetinidis, minha maior referência na barbearia. A partir daquele momento, minha visão sobre a profissão nunca mais foi a mesma.",
    "Também tive a oportunidade de trabalhar na maior rede de barbearia clássica do Brasil, experiência que me proporcionou um aprendizado fantástico sobre a gestão, o funcionamento e a rotina de uma loja.",
    "Sou apaixonado pela barbearia e, principalmente, pela tradição que existe por trás da profissão de barbeiro. Uma profissão que atravessa gerações, que permanece firme diante das modas passageiras e que não precisa de charlatanismo para provar seu valor.",
    "Tenho orgulho de ser chamado de barbeiro.",
    "Porque, para mim, o clássico não é apenas algo que ficou no passado. O clássico está presente, carrega nossa história e aponta para o futuro.",
  ],
  remate: "O clássico é presente, passado e futuro.",
};

/**
 * Curso de barbeiro. O Felipe também ensina.
 *
 * O texto se apoia só no que já está declarado na seção História — estudo com
 * o Vasilis Serafetinidis e a passagem pela maior rede de barbearia clássica
 * do Brasil. Nada sobre formato, carga horária, turmas ou valores: esses dados
 * não foram informados e não podem ser supostos. Ver pendência P16.
 *
 * O CTA vai para o WhatsApp: é conversa, não agendamento de cadeira.
 */
export const curso = {
  etiqueta: "Curso",
  titulo: ["Quem aprende", "de verdade,", "ensina."],
  paragrafos: [
    "A técnica que você vê na cadeira o Felipe também ensina. É o mesmo repertório que ele foi buscar com as próprias referências do estudo com o grego Vasilis Serafetinidis à rotina dentro da maior rede de barbearia clássica do Brasil.",
    "Corte clássico, navalha e o ofício de barbeiro, passados adiante por quem vive disso todos os dias.",
  ],
  chamada: "Quer saber como funciona? Fale direto com ele.",
  cta: "Falar sobre o curso",
  foto: "/images/curso.webp",
  fotoAlt:
    "Barbeiro da Punchline cortando o cabelo de um cliente, com os certificados emoldurados na parede ao fundo",
};

/**
 * Galeria de trabalhos realizados — fotos reais de clientes da Punchline,
 * entregues pelo cliente em 2026-08-05 (`fotosdabarbearia/cortes`).
 *
 * Em 2026-08-06 o Felipe reprovou três fotos (corte-02, corte-03 e corte-05).
 * Foram removidas daqui e de `public/`; os originais seguem em
 * `fotosdabarbearia/`. Em 2026-08-11 entraram as quatro substitutas
 * (corte-10 a corte-13), fechando a galeria em 10 fotos.
 *
 * A ordem não é a dos arquivos: é o que equilibra a altura das três colunas do
 * mosaico, alternando retratos, quadradas e a paisagem.
 *
 * Todas recebem tratamento monocromático (`grade-people`), conforme
 * `specs/design.md` › Direção Fotográfica: pessoas sempre em preto e branco.
 *
 * Os `alt` descrevem o que está na foto, não o nome do arquivo — é o que o
 * leitor de tela vai anunciar e o que o Google vai indexar.
 */
export const galeria = [
  {
    src: "/images/cortes/corte-01.webp",
    alt: "Barbeiro da Punchline finalizando o corte de um cliente na cadeira",
    span: "normal",
  },
  {
    src: "/images/cortes/corte-11.webp",
    alt: "Corte bem curto com degradê alto na lateral, visto de perfil",
    span: "tall",
  },
  {
    src: "/images/cortes/corte-13.webp",
    alt: "Degradê com risco lateral definido e barba cheia modelada",
    span: "tall",
  },
  {
    src: "/images/cortes/corte-10.webp",
    alt: "Franja texturizada com ondas naturais, em close de alto contraste",
    span: "wide",
  },
  {
    src: "/images/cortes/corte-06.webp",
    alt: "Cabelo médio penteado para trás com degradê suave nas laterais",
    span: "tall",
  },
  {
    src: "/images/cortes/corte-12.webp",
    alt: "Corte curto com degradê alto e cavanhaque aparado",
    span: "tall",
  },
  {
    src: "/images/cortes/corte-07.webp",
    alt: "Corte social com risco lateral marcado e barba cheia alinhada",
    span: "normal",
  },
  {
    src: "/images/cortes/corte-08.webp",
    alt: "Corte texturizado com ondas naturais e bigode",
    span: "tall",
  },
  {
    src: "/images/cortes/corte-09.webp",
    alt: "Side part com acabamento brilhante e bigode aparado",
    span: "tall",
  },
  {
    src: "/images/cortes/corte-04.jpg",
    alt: "Corte side part clássico com acabamento penteado e contorno definido",
    span: "tall",
  },
];

export const produtos = {
  titulo: ["Leve", "a barbearia", "com você."],
  descricao:
    "Pomadas, tônicos e cuidados selecionados um a um, testados na cadeira antes de chegarem à prateleira. O acabamento que você recebe aqui continua em casa.",
  /**
   * Marcas comercializadas, confirmadas pelo cliente em 2026-08-06.
   * Listagem apenas — nenhuma marca é vinculada a uma foto específica.
   *
   * Grafia normalizada a partir do que o cliente enviou: "Knucklehead" e
   * "Murray's" foram corrigidos para o nome oficial das marcas.
   */
  marcas: {
    nacionais: [
      "Caballeros Pomade",
      "Knucklehead Pomade",
      "Jelly Roll Grease",
      "Scout Pomade",
    ],
    importadas: [
      "Reuzel",
      "Uppercut Deluxe",
      "Clubman Pinaud",
      "Murray's",
      "Dax Pomade",
    ],
  },

  /**
   * Quatro fotos distintas, escolhidas pelo cliente em 2026-08-06 — a seleção
   * anterior repetia a mesma bancada em três enquadramentos diferentes.
   *
   * A ordem serve ao mosaico: os dois retratos ficam nos slots 3/4 e as duas
   * paisagens nos slots quadrados, para nenhuma foto sofrer corte agressivo.
   */
  fotos: [
    {
      src: "/images/produto-05.webp",
      alt: "Prateleira de três níveis com pomadas, tônicos e loções pós-barba",
    },
    {
      src: "/images/produto-03.webp",
      alt: "Pomadas e tônicos sobre a bancada de atendimento",
    },
    {
      src: "/images/produto-04.webp",
      alt: "Latas de pomada e loção pós-barba alinhadas na prateleira",
    },
    {
      src: "/images/produto-06.webp",
      alt: "Prateleiras com pomadas, latas e produtos de acabamento",
    },
  ],
};

/**
 * Barbeiros da Punchline. Nomes, papéis e retratos confirmados pelo cliente em
 * 2026-08-06. A ordem é intencional: Felipe primeiro, por ser o fundador.
 *
 * Sem linha de especialidade — decisão do cliente. Nome e função bastam.
 */
export const equipe = [
  {
    id: "felipe",
    nome: "Felipe Cunha",
    papel: "Fundador e barbeiro",
    foto: "/images/barbeiros/felipe.webp",
  },
  {
    id: "gabriel",
    nome: "Gabriel Torres",
    papel: "Barbeiro",
    foto: "/images/barbeiros/gabriel.webp",
  },
];

/** Depoimentos reais de clientes, fornecidos pelo cliente em 2026-08-05. */
export const depoimentos = [
  {
    texto:
      "Fui hoje pela primeira vez e já deu pra ver que o barbeiro é realmente diferenciado e profissional. Gostei muito da atenção aos detalhes e da perfeição no acabamento. Outra coisa que me surpreendeu foi que ele sugeriu estilos de corte de acordo com o formato do meu rosto, algo que quase ninguém faz. O resultado ficou excelente. Sem dúvida é uma barbearia única em Nova Santa Rita. Já virei cliente e com certeza voltarei mais vezes.",
    autor: "Juan Guillermo López",
    origem: "Google",
  },
  {
    texto:
      "Fui em todos os barbeiros da cidade, mas nenhum chegou ao mesmo nível da Punchline. Pode ir lá sem receio.",
    autor: "Vitor Brack",
    origem: "Google",
  },
  {
    texto:
      "Ambiente aconchegante com barbeiros profissionais. Estrutura muito boa, a melhor da região!",
    autor: "Cleber Lima",
    origem: "Google",
  },
] as { texto: string; autor: string; origem: string }[] | null;
