# memoria.md — Punchline Barbearia

Histórico vivo do projeto. Registrar aqui toda decisão relevante, feedback,
aprendizado, ajuste aprovado, melhoria implementada, alteração futura e
observação importante.

Formato de registro: `AAAA-MM-DD — título curto` seguido da descrição e, quando
houver, do motivo.

---

## Decisões Tomadas

### 2026-08-05 — Criação do cérebro do projeto

Criada a estrutura de documentação base antes de qualquer código:

- `CLAUDE.md` — objetivo, posicionamento, regras gerais, fluxo de trabalho.
- `specs/design.md` — fonte da verdade de design, UX, UI e direção criativa.
- `memoria.md` — este arquivo.

**Motivo:** garantir que toda implementação parta de um contexto único e
consistente, evitando decisões improvisadas.

### 2026-08-05 — Stack definida

Next.js + TypeScript + Tailwind CSS + Framer Motion, com GSAP reservado apenas
para interações avançadas.

### 2026-08-05 — Stack confirmada após questionamento sobre publicação

Levantada a possibilidade de trocar tudo por `index.html` + CSS puro, por
preocupação de que a landing precisa ir ao ar em domínio próprio.

**Esclarecido:** Next.js com export estático (`output: 'export'`) gera HTML, CSS
e JS puros na pasta `out/`, publicáveis em qualquer hospedagem — não exige
servidor Node no ar. Todas as animações da spec (Framer Motion, GSAP, parallax,
sticky) rodam no navegador do visitante e não dependem de servidor.

**Decisão: manter Next.js**, configurando export estático desde o início.
`specs/design.md` permanece válida sem nenhuma reescrita — Framer Motion segue
como biblioteca principal de animação.

**Restrição assumida:** nada de rotas de API, Server Actions, ISR ou
`next/image` com loader padrão. Usar `images: { unoptimized: true }`.

### 2026-08-05 — Conteúdo faltante será marcado, nunca inventado

A landing será construída completa em estrutura, usando marcadores visíveis no
código (padrão `[[PREENCHER: ...]]`) onde faltar dado real — preços, serviços,
endereço, contato, avaliações, link de agendamento.

**Motivo:** permitir avançar no design e na experiência sem violar a regra de
não inventar conteúdo. Cada marcador corresponde a uma pendência da tabela
abaixo.

### 2026-08-05 — Direção fotográfica: monocromático + acento dourado

Nasceu da auditoria dos assets. O acervo é heterogêneo demais para ser usado em
cor: a foto do Felipe é um P&B editorial excelente, e as fotos do salão têm luz
chapada e parede verde.

**Decisão:** unificar tudo em monocromático. Pessoas em P&B puro, ambientes com
dessaturação forte e viés quente, produtos com dessaturação parcial. A única cor
saturada da página passa a ser o `#C9A86A`, e ela pertence à interface, nunca à
fotografia.

**Motivo:** resolve o ruído do verde da parede, esconde a inconsistência de luz
entre as sessões, eleva o material fraco ao padrão do material forte e reforça o
posicionamento premium sem depender de fotos novas.

Registrado em `specs/design.md` › Direção Fotográfica.

### 2026-08-05 — Regra de bloqueio por contradição

Qualquer pedido que contradiga `specs/design.md` interrompe o trabalho e é
sinalizado antes de qualquer alteração.

### 2026-08-05 — Referência principal de movimento

Amphora (https://amphora-it.com/) definida como referência principal de scroll
cinematográfico e narrativa de navegação. Referências secundárias: Gentlemen
Barber Clubs e The Beardsmith.
**Apenas linguagem de movimento e direção artística** — nada de cópia de layout,
componentes ou identidade visual.

---

## Inventário de Assets (verificado em 2026-08-05)

```
/fotosdabarbearia
├── barbearia/          19 arquivos (DSC_03xx.JPG, IMG_30xx.jpg)
├── barbeiros/           2 arquivos (Felipe e Gabriel) — add. em 2026-08-06
├── cortes/              9 arquivos (corte-01 a corte-09) — add. em 2026-08-06
├── donoDaBarbearia/     1 arquivo
└── produtos/            8 arquivos (DSC_03xx.JPG)
```

```
/referencia1
├── Websites, Shops & Mehr | Amphora.webloc  → https://amphora-it.com/
├── Gentlemen Barber Clubs.webloc            → https://www.gentlemen-barberclubs.de/
├── Gentlemen Barber Clubs.png               (captura de tela)
├── The Beardsmith.webloc                    → https://www.thebeardsmith.com/
└── The Beardsmith.pdf                       (captura completa da página)
```

---

## Análise das Referências (2026-08-05)

### The Beardsmith — https://www.thebeardsmith.com/

A referência **mais próxima estruturalmente** do que a Punchline precisa. Fundo
escuro, tipografia display condensada em caixa alta, acento âmbar/creme.

Estrutura observada, na ordem:

1. Header fixo com logo + endereço miúdo, menu curto, ícones sociais e **dois
   CTAs sempre visíveis** (agendar + ligar).
2. Hero: eyebrow com endereço → headline de 3 linhas em display gigante →
   subheadline curta → 3 CTAs (primário, secundário, terciário) → card lateral
   com "regras da casa".
3. "Meet the Barbers": cards verticais escuros, retrato tratado, apelido de cada
   barbeiro, uma linha de personalidade e CTA individual "Book with X".
4. Serviços em grid de cards com etiqueta, título serifado, descrição e uma
   linha de "melhor para".
5. Galeria split: texto à esquerda fixo, mosaico de fotos em alturas
   diferentes à direita, com legendas discretas.
6. Produtos: split foto grande / texto + CTAs.
7. Prova social: bloco "600+ Google Reviews" em número gigante.
8. Localização: endereço em display, horários, mapa escuro, CTAs de rota.
9. Fecho full-bleed com uma única frase: "The mirror is ready."

**Aproveitar:** o ritmo (hero → pessoas → serviços → galeria → produtos → prova
→ local → fecho), o número gigante como prova social, e a frase de fechamento.
**Não aproveitar:** mascotes ilustrados, paleta vermelha, tom informal.

### Gentlemen Barber Clubs — https://www.gentlemen-barberclubs.de/

Mosaico de fotos em alturas variadas sobre fundo escuro com foto de ambiente ao
fundo em baixa opacidade, títulos display dourados com ornamento fino acima e
abaixo, citações em serifada itálica sobre bloco claro, contato com telefone em
destaque + horários + mapa.

**Aproveitar:** o mosaico com profundidade e o tratamento dourado dos títulos —
combina com o `#C9A86A` da Punchline.
**Não aproveitar:** divisórias em pincelada branca (datado), inversão para
fundo claro no meio da página, ornamentos vintage.

### Amphora — https://amphora-it.com/ (referência principal de movimento)

Não capturada em imagem na pasta, apenas o link. Segue como referência de
movimento conforme `specs/design.md`.

---

## Análise dos Assets Reais (2026-08-05) — LEITURA OBRIGATÓRIA

Verifiquei as 28 fotos. **Existe uma distância real entre o discurso premium da
spec e o que as fotos mostram.** Registrado aqui para não ser esquecido.

### barbearia/ (19 fotos)

**O que é genuinamente forte:**

- **As duas cadeiras de barbeiro antigas** — cromado ornamentado, couro marrom e
  couro vinho. São o melhor ativo visual da marca. Fotogênicas, com história,
  premium de verdade. Vários close-ups aproveitáveis: `DSC_0323`, `DSC_0327`,
  `DSC_0359`, `DSC_0360`, `DSC_0368`, `DSC_0372`.
- **Detalhes de ferramentas sobre superfície escura** — navalhas, tesouras,
  pincel, pente: `DSC_0331`, `DSC_0339`, `DSC_0348`. Casam perfeitamente com o
  fundo `#0F0F0F`.

**O que é problemático:**

- As fotos amplas do salão (`IMG_3014`–`IMG_3025`, `DSC_0354`, `DSC_0355`)
  mostram parede verde e branca, piso de cerâmica claro, luz do dia chapada,
  prateleiras carregadas, um **micro-ondas coberto de adesivos**, uma garrafa de
  Jägermeister, vaso de planta e ar-condicionado à vista.
- Não sustentam "luxo minimalista" se usadas grandes, claras ou em full-bleed.
  É uma barbearia de bairro bem cuidada — não um ambiente premium fotografado.

### produtos/ (8 fotos)

Prateleiras e bancada com produtos reais. Marcas legíveis: **Reuzel**,
**Clubman Pinaud**, **Scout**, entre outras não identificáveis com certeza (não
serão nomeadas sem confirmação — ver pendência **P13**).

Fundo de parede branca e luz chapada. Aproveitáveis, mas exigem crop fechado e
tratamento escuro.

### donoDaBarbearia/ (1 foto) — CONFIRMADO: é o Felipe Cunha

**Confirmado pelo cliente em 2026-08-05:** o arquivo
`SaveClip.App_472179360_18482164621030408_1319610831095509474_n.jpg` é a foto do
Felipe Cunha.

Descrição: retrato em preto e branco, 1440×1800, Felipe **sentado na cadeira
recebendo o acabamento** de um corte *side part* impecável. Olhar direto para a
câmera. Aparecem a capa de corte e o braço tatuado de outro barbeiro com pente e
máquina.

**Avaliação:** é de longe a melhor foto do acervo. Preto e branco de alto
contraste, luz dramática, foco perfeito, presença forte. Estabelece o padrão
visual de toda a landing.

**Ressalva:** ele aparece como cliente, não como barbeiro. A seção Fundador não
pode ser escrita como "Felipe atendendo" — deve ser enquadrada como *o padrão
começa por ele*, o que é honesto com a imagem.

**Uso definido:** crop vertical fechado no rosto, reduzindo capa e braço
tatuado. Continua valendo a recomendação de um retrato dele em postura de
barbeiro na próxima sessão de fotos (item 1 da lista).

### Conclusão da análise

A landing pode ficar mais impressionante que o material fotográfico disponível.
Isso não é sustentável para uma marca que promete "a melhor barbearia da
região" — o cliente chega esperando o que viu.

**Direção fotográfica adotada enquanto não houver material novo:**

1. Heróis visuais = as cadeiras antigas e os detalhes de ferramentas.
2. Grading escuro obrigatório em toda foto: overlay `#0F0F0F` com gradiente,
   dessaturação parcial, contraste alto.
3. Fotos amplas do salão **nunca** em full-bleed claro — apenas como camada de
   fundo muito escurecida e/ou desfocada, em parallax.
4. Crops fechados sempre que a moldura original mostrar clutter.
5. Zero fotos de banco de imagens misturadas às reais.

**Recomendação forte:** nova sessão de fotos. Lista de fotos necessárias
registrada em *Alterações Futuras*.

---

## Observações Importantes

### Pasta de referências fora do caminho documentado

O fluxo de trabalho manda ler `specs/referencia1`, mas a pasta está na **raiz**
do projeto (`/referencia1`). Enquanto não for movida, ler `/referencia1`.
→ Ver pendência **P1**.

### Só uma foto do Felipe, e nela ele aparece como cliente

A pasta `donoDaBarbearia/` tem uma única imagem. **Confirmado pelo cliente: é o
Felipe.** Mas ele aparece sentado na cadeira recebendo o corte, não atendendo.
Serve como retrato, não como foto de autoridade em ação.
→ Ver pendência **P2**.

*(Esta observação corrige uma anotação anterior que dizia que a foto não era
dele. Ver a análise confirmada em "Análise dos Assets Reais".)*

### ~~Sem fotos de trabalhos realizados~~ — RESOLVIDO em 2026-08-06

Nove fotos de cortes e barbas entregues pelo cliente em
`fotosdabarbearia/cortes/`. A Galeria de Trabalhos agora usa material real.

### Sem vídeo para o Hero

O Hero prevê "imagem ou vídeo fullscreen". Não há vídeo entre os assets — por
ora, o Hero será construído com imagem.
→ Ver pendência **P4**.

---

## Pendências — Informações que Faltam

Nada aqui pode ser inventado. Cada item precisa ser respondido antes da seção
correspondente ser implementada.

| ID  | Pendência | Bloqueia |
| --- | --------- | -------- |
| P1  | Mover `/referencia1` para `specs/referencia1` ou manter na raiz? | Consistência do fluxo de trabalho |
| P4  | Existe vídeo institucional para o Hero? | Hero Section |
| P14 | O AppBarber tem link de agendamento por profissional? | CTA individual por barbeiro |
| P19 | Aviso de consentimento de cookies (LGPD) — o Analytics já grava cookie | Conformidade |
| P16 | Detalhes do curso: formato, carga horária, turmas, pré-requisitos, valores | Seção Curso — hoje só com texto genérico |
| P11 | Logo em vetor (SVG/AI) — o favicon parte de um PNG; vetor daria nitidez em qualquer tamanho e permitiria usar a marca no cabeçalho | Header, favicon |

---

## Feedbacks

### 2026-08-05 — Primeira rodada de revisão do cliente

**Dados reais fornecidos e já aplicados:**

- Agendamento: `https://sites.appbarber.com.br/punchline-vy4t` (AppBarber).
  Usado em todos os CTAs de agendar e no `ReserveAction` do Schema.
- WhatsApp: `5551999702013`. É o **único** canal de contato por voz/mensagem —
  a Punchline não tem telefone fixo. Campo `telefone` removido do site.
- Mapa: `https://share.google/1nUrCWRepM8Ds3Kmr`. Faz o papel do endereço para
  o visitante enquanto o endereço em texto não vem.
- Horários: seg 14–20; ter a sex 10–20; sáb 10–16. Domingo fechado.
- Três depoimentos reais do Google, com nome: Juan Guillermo López, Vitor Brack
  e Cleber Lima.

**Decisões de conteúdo:**

- **Nota e quantidade de avaliações do Google: removidas.** Em vez disso, o
  bloco de prova social passou a ser "Clientes atendidos", com contador
  animado subindo até **580+** ao entrar em cena.
- Consequência técnica: o `aggregateRating` saiu do Schema. Clientes atendidos
  não é nota média nem número de reviews — emitir rating sem esses dois valores
  reais seria inventar prova social para o Google.
- O CTA flutuante aponta para o WhatsApp, então passou a se chamar "Chamar no
  WhatsApp". Antes dizia "Agendar", o que seria enganoso.

**Correção de bug relatada:** sobreposição dos textos na seção Experiência.
Ver *Aprendizados*.

Marcadores pendentes caíram de **39 para 20**.

### 2026-08-05 — Serviços: lista completa, sem preço

Os 11 serviços reais foram fornecidos, com duração e **sem valores**.

**Regra firme: preço não aparece no site.** Não existe campo de preço em
`lib/content.ts` — foi removido de propósito, para ninguém preencher por
engano. O valor fica para o atendimento e para a tela de agendamento.

| Grupo | Serviços |
| --- | --- |
| Cortes | Corte 45min · Corte com Máquina 30min · Corte Social 30min · Corte Infantil 30min |
| Barba | Barba Tradicional 45min · Barba Expressa 30min |
| Corte e Barba | Corte e Barba Tradicional 75min · Corte e Barba Expressa 60min · Corte Social e Barba Tradicional 60min · Corte com Máquina e Barba Tradicional 45min |
| Acabamento | Acabamento / Pezinho 15min |

**Decisões de apresentação:**

- Cards viraram **lista editorial**. Com 11 itens, o grid de cards virava uma
  parede de blocos e matava o respiro que a marca pede.
- Os serviços foram **agrupados por tipo**. A lista original estava em ordem
  alfabética, o que espalhava "Corte" e "Corte e Barba" por toda a lista.
- O texto entre parênteses do cliente virou linha de detalhe: "1 pente em todo
  o cabelo", "somente 1 pente lateral", "somente com máquina".
- Grafia normalizada: "Máquina" e "Tradicional" com acento e maiúscula
  consistentes.
- Sem descrições inventadas. Os nomes e os detalhes do cliente bastam.
- `hasOfferCatalog` adicionado ao Schema, com os 11 serviços e **nenhum campo
  de preço** — Offer com valor inventado seria declaração falsa ao Google.

Marcadores pendentes caíram de **20 para 7**.

### 2026-08-05 — Segunda rodada: textos, endereço e Instagram

**Dados reais recebidos:**

- Endereço: Helio Fraga de Moraes Sarmento, 184 — Centro — Nova Santa Rita/RS,
  CEP 92480-000. Grafia mantida como o cliente enviou (não acentuei "Helio":
  acento em nome próprio é suposição).
- Instagram: `https://www.instagram.com/punchlinebr/` — handle `@punchlinebr`.
  Atenção: o placeholder anterior dizia `@punchlinebarbearia`, que **não
  existe**.
- Mapa atualizado para `https://maps.app.goo.gl/H9MTbDNvJY96k6Xi9?g_st=ic`,
  substituindo o link `share.google` em todos os pontos.

**Textos substituídos pelo cliente:** capítulo "A cadeira" da Experiência,
título e parágrafo de Serviços ("Nossos serviços"), título e parágrafo de
Reputação ("Quem conhece / reconhece").

**Remoções:** botão "Ver no mapa" do bloco de prova social.

**Serviços agora entram por grupo conforme o scroll.** Cada grupo tem gatilho
próprio com margem de -25%, então Cortes → Barba → Corte e Barba → Acabamento
surgem em sequência. Dentro do grupo, `staggerChildren` faz os serviços
entrarem um atrás do outro.

Marcadores pendentes caíram de **7 para 4**.

### 2026-08-06 — Galeria com trabalhos reais

O cliente entregou **9 fotos de cortes e barbas** em
`fotosdabarbearia/cortes/` (corte-01 a corte-09). A pendência **P3** está
resolvida.

Copiadas para `public/images/cortes/`. Os originais já vinham bem comprimidos:
reencodar só aumentava o arquivo, então foram copiados como estavam. Só o
`corte-08` (933 KB) foi reduzido, para 283 KB. Total: 1,6 MB.

**Tratamento:** `grade-people`, preto e branco puro. São fotos de pessoas, e a
regra da direção fotográfica não abre exceção. Também resolve a parede verde
que aparece em várias delas.

**Texto da seção atualizado.** O título era "O ambiente fala antes da gente" e
o parágrafo falava de cadeiras e ferramentas — escritos quando só havia fotos
do salão. Com trabalhos reais na galeria, virou **"Feito na cadeira."**, com
CTA "Quero o meu". *Se preferir o texto anterior, é só pedir.*

**Correção de acessibilidade:** a terceira coluna era `hidden md:block`, o que
escondia um terço das fotos no celular — justamente de quem mais acessa pelo
telefone. Agora são 3 colunas no desktop e 2 no celular, com as 9 fotos sempre
presentes.

**Os `alt` descrevem o corte**, não o nome do arquivo: é o que o leitor de tela
anuncia e o que o Google indexa.

**Observação:** a `corte-01` mostra um barbeiro finalizando o corte de um
cliente — a única foto do acervo com alguém trabalhando. Não dá para saber se é
o Felipe. Se for, resolve metade da pendência **P2**.

### 2026-08-06 — Felipe reprovou 3 fotos da galeria

Removidas: `corte-02` (perfil com tatuagens no rosto), `corte-03` (barbudo de
frente) e `corte-05` (nuca com cabelo cacheado).

Tiradas de `lib/content.ts` e de `public/images/cortes/`. **Os originais foram
mantidos em `fotosdabarbearia/cortes/`** — a pasta é o acervo do cliente, não
cabe ao site apagar arquivo de lá.

**Repostas em 2026-08-11** por `corte-10` a `corte-13`. A galeria fechou em
**10 fotos**.

Tratamento na importação:

| Arquivo | Original | Depois |
| --- | --- | --- |
| corte-10 | JPG 6000x4000, 7,0 MB | 1400x933, 414 KB |
| corte-11 | JPG 1080x1620, 660 KB | 933x1400, 198 KB |
| corte-12 | JPG 4000x6000, 6,0 MB | 933x1400, 184 KB |
| corte-13 | **HEIC** 4032x3024 com rotação de EXIF | JPG 1050x1400, 280 KB |

Duas vinham direto da câmera com 6 a 7 MB, e a do iPhone era HEIC — formato que
o Safari abre mas o resto do mundo não. O script de importação
(`scratchpad/importar.swift`) converte para JPEG, limita a 1400px e grava a
rotação nos pixels de uma vez só.

**Equilíbrio do mosaico:** com 10 fotos em 3 colunas, a primeira recebe 4 e as
outras 3. Na primeira tentativa as colunas ficaram com 336px de diferença
(17%). Redistribuindo os formatos — a coluna de 4 itens ficou com as duas
quadradas e a paisagem, as de 3 itens só com retratos — a diferença caiu para
**52px (3%)** no desktop e 34px no celular.

### 2026-08-06 — Rodada de copy do cliente: manifesto, história e marcas

Textos definitivos entregues pelo cliente. **A página ficou sem nenhum
marcador `[[PREENCHER]]`** — de 39 no começo para zero.

**Hero — manifesto.** A subheadline curta virou um texto de ~120 palavras, com
tom de manifesto ("...você não vai chorar depois do corte"). Está em parágrafos
e a última linha vai em dourado: é literalmente a punchline da Punchline.

*Custo dimensional:* na primeira versão (~120 palavras) o hero deixou de caber
em uma tela de celular — chegou a exceder 154px num iPhone SE, empurrando os
CTAs para baixo da dobra.

**Resolvido em 2026-08-11:** o cliente reescreveu o manifesto pela metade
(~60 palavras, três parágrafos mais o remate). O hero voltou a caber em uma
tela em todos os tamanhos testados:

| Tela | Altura do hero | Excede |
| --- | --- | --- |
| 1440x900 | 900px | 0 |
| 375x812 | 812px | 0 |
| 375x667 (iPhone SE) | 667px | 0 |

**O corpo do texto fica em 14px no celular** (16px de `sm` para cima). Medido:
no SE sobram só 17px de folga, então aumentar a fonte estoura a dobra de novo.
Se o texto crescer no futuro, é este número que precisa ser conferido antes.

**Seção Fundador virou História da Barbearia.** Deixou de ser retrato do
Felipe e passou a contar a trajetória da Punchline (sonho em setembro de 2021,
abertura em fevereiro de 2025, estudo com o grego Vasilis Serafetinidis em 2024,
passagem pela maior rede de barbearia clássica do Brasil).

- Arquivo renomeado para `historia.tsx`, id `#historia`, rótulo "História" no
  menu e no rodapé.
- O texto é em primeira pessoa e assinado, então é apresentado como depoimento,
  com o remate "O clássico é presente, passado e futuro." destacado em citação.
- A lista separada de "Formação e especializações" foi removida: as formações
  já estão narradas no texto. Duplicar viraria repetição.

**Capítulos da Experiência reescritos.** Os três textos triplicaram de tamanho.
O capítulo 03 passou a transbordar o bloco fixo em 14px, então número e título
encolheram (de 6rem/4.2rem para 4rem/3.2rem) e o container foi de 24rem para
27rem. Sem transbordo em nenhuma tela.

*Observação:* o cliente pediu para substituir um texto ("O papel do barbeiro é
dar forma ao que cresce sem forma...") que **não existia no código** — o
capítulo 03 dizia "Ninguém sai com pressa daqui...". Como o tema é o mesmo, a
substituição foi aplicada ali.

**Marcas dos produtos** listadas em dois grupos, nacionais e importadas, sem
vincular marca a foto. Grafia corrigida para o nome oficial: "Knucklehead" e
"Murray's".

**Texto dos Barbeiros** trocado pelo do cliente, sobre a relação de confiança
entre cliente e barbeiro.

### 2026-08-12 — Títulos aparecendo pela metade no celular

Relatado pelo cliente com prints: em Serviços, Galeria, Produtos e Reputação, a
**última linha do título não aparecia** — "NOSSOS" sem "serviços", "FEITO" sem
"na cadeira", "QUEM CONHECE" sem "reconhece". Ocorria também em Samsung.

**Causa.** O `MaskTitle` colocava `whileInView` em *cada linha* — um
IntersectionObserver por linha, cada uma com seu próprio `delay`. As linhas com
atraso (`i * 0.09`) ficavam vulneráveis: qualquer re-renderização logo após a
montagem — e existem várias, por causa do `useMediaQuery` com
`useSyncExternalStore` — pegava a animação ainda no período de espera e a
descartava. A linha 0, sem atraso, já tinha começado e sobrevivia. Daí o padrão
sempre igual: a primeira aparece, as seguintes não.

O estado quebrado é grave porque `initial={{ y: "108%" }}` não mexe em
opacidade: a linha fica **posicionada fora da máscara**, ou seja, o texto
simplesmente some.

**Correção.** Um observador só, no título inteiro, com as linhas escalonadas
por `staggerChildren` em variants. A orquestração passa a ser do pai, que tem
estado estável entre re-renderizações. Não existe mais o estado "metade
apareceu": ou o título inteiro anima, ou nenhuma linha anima.

Conferido que o `div` extra em volta do `<Tag>` não mexeu no layout: os oito
títulos mantêm `margin-top: 28px` e largura cheia.

**Regra:** título dividido em linhas animadas usa **um** gatilho no bloco, com
stagger. Um gatilho por linha multiplica os pontos de falha.

### 2026-08-12 — Rodapé reorganizado no celular

Oito links em `flex-wrap` quebravam onde calhasse — três numa linha, dois na
outra, um sozinho — e o bloco parecia jogado, principalmente no Android.

Virou grade de duas colunas no celular (`flex-wrap` só a partir de `sm`).
Agora são 4 linhas alinhadas, com as colunas na mesma largura.

### 2026-08-12 — Desempenho: recomendações do PageSpeed

Quatro das cinco recomendações foram atendidas. A quinta foi recusada com
motivo.

**1. Atraso de 2,64s na renderização da LCP — a mais grave, resolvida.**

O elemento de LCP era o parágrafo do manifesto no hero, animado com Framer
Motion. O HTML saía do servidor com `opacity: 0` e o texto só aparecia depois
que o bundle carregava e hidratava.

A entrada do hero passou a ser **CSS puro** (`@keyframes entrada-hero`, com
`animation-delay` por elemento). O navegador pinta e anima sem esperar
JavaScript nenhum. Confirmado no HTML publicado: a tag sai
`<p class="entrada-hero" style="animation-delay:0.22s">`, sem `opacity: 0`.

**Regra que fica:** conteúdo da primeira dobra não se anima em JavaScript. O
que estiver acima da dobra tem que nascer visível no HTML.

**2. Entrega de imagens — 238 KB economizados**, mais que os 99 KB estimados
pelo PageSpeed.

| Imagem | Antes | Depois | Motivo |
| --- | --- | --- | --- |
| cadeira-01 | 1600px, 90 KB | 1280px, 55 KB | Exibida em 634px |
| ambiente-02 | 1800px, 109 KB | 1100px, 34 KB | Fundo desfocado e escurecido |
| ambiente-04 | 1800px, 109 KB | 1100px, 36 KB | Idem |
| ferramentas-01 | 1600px, 40 KB | 1280px, 24 KB | Mesmo espaço da cadeira-01 |
| cadeira-03 | 1600px, 98 KB | 1280px, 59 KB | Mesmo espaço da cadeira-01 |

Os fundos passam por blur, brilho 0.34 e um véu de 85% por cima — ninguém
enxerga detalhe ali, então aceitam compressão agressiva.

**3. Preconnect** para `googletagmanager.com`, único domínio externo da página.
As fontes não precisam: o `next/font` as serve do próprio domínio.

**4. JavaScript legado (12 KiB) — RECUSADO, com dado.**

A sugestão é mirar navegadores modernos no browserslist e parar de gerar
polyfills (`Object.hasOwn`, `Array.prototype.at` e outros). Medido com a base
do caniuse: **1,41% do tráfego brasileiro** está em navegador anterior a esse
alvo — boa parte em UC Browser, comum em Android de entrada.

Sem os polyfills, esses 1,41% não veem o site degradado: veem **página em
branco**, porque o JavaScript lança erro. Trocar 12 KiB por 1 em cada 70
visitantes perdidos é péssimo negócio para um site cujo objetivo é agendamento.

*Se um dia o Analytics mostrar que esse público não existe de fato, a mudança é
uma linha no `package.json`.*

**5. CSS que bloqueia renderização (9,3 KiB, 180 ms) — não perseguido.**

É a folha do Tailwind, já pequena e já minificada. Extrair CSS crítico exigiria
ferramenta extra no build para ganhar poucos milissegundos. O custo de
manutenção não compensa.

### 2026-08-12 — Domínio definitivo: punchlines.com.br

Confirmado pelo cliente. Trocado em `lib/content.ts`, que é a **única fonte**
desse endereço no projeto — daí saem canonical, Open Graph, Twitter card,
sitemap.xml, robots.txt e todas as URLs absolutas do JSON-LD.

Conferido no build: nenhum resquício do domínio provisório em `out/`.

**Correção aproveitando a passagem:** o `HairSalon` declarava a URL sem barra
final e o `WebSite` com barra. Como o projeto usa `trailingSlash: true`, a
forma canônica é com barra — duas variantes fariam o Google enxergar dois
endereços para a mesma página. Agora os três (canonical, HairSalon e WebSite)
dizem exatamente `https://punchlines.com.br/`.

Observação de marca: o domínio é `punchlines.com.br`, no plural, enquanto o
nome usado no site é "Punchline Barbearia". Não muda nada tecnicamente, mas
vale saber que a URL e a marca não são idênticas.

### 2026-08-12 — Preparação para deploy na Vercel

Criado `.gitignore`, que não existia. Além do óbvio (`node_modules`, `.next`,
`out`, `.env*`), ele exclui duas pastas pesadas de propósito:

- `fotosdabarbearia/` — 250 MB de originais de câmera e celular. O site não usa
  nenhum deles; usa as versões tratadas em `public/images`.
- `referencia1/` — 26 MB de capturas e PDF de referência de direção de arte.

As duas são material de origem e **precisam de backup próprio** — não estarão
no repositório.

Pacote gerado em `~/Downloads/punchline-vercel.zip`: **2,9 MB, 80 arquivos**.
Sem as exclusões daria 28 MB, quase tudo por causa de um PNG de referência de
15 MB e um PDF de 11 MB.

**Sobre `output: "export"`.** A configuração nasceu da possibilidade de
hospedagem tradicional por FTP. Na Vercel ela não é necessária — a plataforma
roda o Next nativamente. Mantida por enquanto porque funciona e preserva a
opção de trocar de hospedagem. Se a Vercel virar definitiva, vale remover:
libera otimização automática de imagem, e aí o WebP manual passa a ser
redundante.

### 2026-08-12 — Favicon com o logo real

Recebido `fotosdabarbearia/barbearia/favIcon.png` (1536x1024, fundo
transparente): o "P" cursivo amarelo com sombra verde. Substituiu o monograma
provisório, que foi apagado.

**A arte precisou de preparo, não bastou apontar o arquivo:**

- A letra ocupava 860x922 num quadro de 1536x1024 — o resto era margem vazia.
  Num favicon de 32px isso viraria um símbolo minúsculo perdido. Recortada
  rente e reencaixada com respiro proporcional.
- `app/icon.png` (256x256) fica **transparente**, para se adaptar a aba clara e
  escura.
- `app/apple-icon.png` (180x180) leva fundo `#0F0F0F` de propósito: **o iOS
  ignora transparência em ícone de tela inicial e preenche com preto**. Melhor
  decidir o fundo do que herdar um.
- Peso: 128 KB → **9 KB** e 17 KB → **4 KB**, com paleta reduzida. A arte tem
  duas cores chapadas, não precisa de PNG de cor verdadeira.

Legibilidade conferida em 32px (nítido) e 16px (no limite, mas reconhecível —
limitação da letra cursiva fina, não do arquivo).

**Divergência de paleta registrada.** O logo real é **amarelo + verde**, e o
`specs/design.md` define a identidade do site em **#0F0F0F + #C9A86A**. O
cliente optou por usar o logo como ele é; o site segue preto e dourado. Não é
erro, mas é uma inconsistência consciente — se um dia a paleta for revista,
este é o ponto de partida da conversa.

O logo continua **sem versão em vetor** (P11): tudo aqui parte de um PNG.

### 2026-08-12 — "Premium" sai do título

O título da aba e do Google dizia "Barbearia Premium em Nova Santa Rita". O
cliente pediu **Clássica**, que é como a marca se descreve no próprio texto do
site. Ajustado no `<title>`, na meta description e na descrição do Schema.

A keyword "Barbearia Premium RS" continua na lista de keywords — está em
`specs/design.md` e não aparece para o visitante.

### 2026-08-12 — Clientes atendidos: 580+ vira 10 mil+

Número atualizado pelo cliente.

**Formatação precisou mudar junto.** "10000" em corpo gigante fica ilegível, e
"10.000" faz o ponto sumir no meio dos dígitos. Acima de mil o contador passa a
exibir em milhares, com uma casa decimal durante a contagem para a animação não
pular aos trancos: `0 → 340 → 1,2 mil → 3,4 mil → 6,8 mil → 9,9 mil → 10 mil+`.

O texto para leitor de tela virou uma frase inteira ("Mais de 10 mil clientes
atendidos") em vez do número solto — é também o que aparece para quem abre a
página sem JavaScript.

### 2026-08-12 — SEO técnico, indexação, compartilhamento e Analytics

Auditoria antes de mexer. **Já existia e não foi duplicado:** metadata completa
em `app/layout.tsx` (title com template, description, keywords, canonical,
Open Graph, Twitter card, robots, metadataBase, themeColor) e o JSON-LD
`HairSalon`.

**Bug encontrado na auditoria:** o Open Graph declarava a imagem como 1200x630,
mas o arquivo tinha 2200x1466. Dimensão declarada errada faz o WhatsApp e o
Facebook cortarem a prévia de qualquer jeito. Criada `public/images/og.jpg`,
recorte real 1200x630 (88 KB), em JPEG — geradores de prévia são irregulares
com WebP.

**Favicon.** Provisório num primeiro momento (monograma "P" desenhado em SVG),
substituído em 2026-08-12 pelo logo real — ver registro próprio abaixo.

**JSON-LD reorganizado em um `@graph` único** com três tipos:

| Tipo | Por quê |
| --- | --- |
| `HairSalon` | O negócio. Subtipo de LocalBusiness, é o que alimenta resultado local, mapa e horário |
| `WebSite` | Identifica o site e liga ao negócio por `@id`, sem repetir dados |
| `Course` | O curso de barbeiro é oferta distinta do serviço de barbearia |

Um bloco só: dois `<script>` de JSON-LD sobre o mesmo negócio viram entidades
duplicadas para o Google. O `Course` vai sem `offers` nem `hasCourseInstance`
— preço, formato e datas não foram informados (P16).

**Sitemap e robots pelo caminho nativo** (`app/sitemap.ts` e `app/robots.ts`).
Os dois exigiram `export const dynamic = "force-static"`: sem isso o build com
`output: "export"` falha. O sitemap tem **uma URL só** — o site é landing page
única, e âncoras (`#servicos`) não são URLs indexáveis.

No robots.txt, o cuidado principal foi **não** bloquear `/_next/`. É o erro
clássico em projeto Next: parece limpeza, mas impede o Google de baixar CSS e
JS, e ele passa a avaliar uma página quebrada.

**`public/llms.txt`** com serviços e durações, equipe, história, produtos,
horários, endereço e links reais. Registra explicitamente o que **não** existe
— loja online, telefone fixo, preços publicados — para a IA não preencher a
lacuna sozinha.

**Google Analytics** implementado em `components/analytics.tsx`.
**ID recebido em 2026-08-12: `G-7V1V1D7Y3X`** — configurado e verificado no
HTML publicado (exatamente uma tag, sem duplicação).

**O ID mora em `lib/content.ts`, não só em variável de ambiente.** Motivo: o
build é estático e roda na máquina de quem publica. Se dependesse de um
`.env.local`, bastava alguém rodar `npm run build` sem o arquivo para o site ir
ao ar sem medição — e em silêncio, sem erro nenhum. ID de medição não é
segredo: ele aparece no código-fonte de qualquer site que use Analytics.
`NEXT_PUBLIC_GA_ID` continua existindo e tem precedência, para ambiente de
teste.

**Atenção à LGPD:** o Analytics está ativo e grava cookie. Site brasileiro com
cookie de medição pede aviso de consentimento. Não foi implementado banner —
decisão do cliente. → pendência **P19**.

### 2026-08-12 — Imagens em WebP e limpeza de órfãs

Pergunta do cliente: vale converter para WebP? Medido antes de responder.

**Duas coisas diferentes apareceram na medição:**

1. **2,1 MB de imagens órfãs** — 9 arquivos que ficaram em `public/images` depois
   das trocas de galeria, produtos e História, sem nenhuma referência no
   código. Como o export estático copia tudo que está em `public/`, elas iriam
   ao ar sem nunca serem exibidas. Removidas: ganho de graça, sem perda de
   qualidade.
2. **WebP:** −58% nas imagens que realmente são usadas.

| | Antes | Depois |
| --- | --- | --- |
| Total | 7,7 MB em 34 arquivos | **2,7 MB em 26** |
| Hero (define a velocidade percebida) | 403 KB | **125 KB** |

**Detalhes que exigiram decisão:**

- **`corte-04` ficou 10% MAIOR em WebP** (299 KB → 329 KB). Acontece com certas
  imagens. A conversão é por arquivo, com regra: só troca se o WebP economizar
  pelo menos 5%. Esse ficou em JPEG.
- **O Open Graph continua apontando para JPEG.** WhatsApp e outros geradores de
  prévia de link são irregulares com WebP, e o compartilhamento por WhatsApp é
  central para esta barbearia. Por isso o `cadeira-hero.jpg` foi mantido só
  para `openGraph`, `twitter` e o Schema — a página usa a versão `.webp`.
- Ferramenta: `sharp`, que já vinha instalado como dependência do Next. Não foi
  preciso instalar nada. O `sips` do macOS e o ImageIO **não** codificam WebP.

**Por que não precisa de fallback:** WebP é suportado por todos os navegadores
desde 2020. Manter `<picture>` com JPEG reserva dobraria os arquivos para
atender a uma fatia irrelevante.

Verificado no navegador: as 28 imagens da página carregam, nenhuma quebrada,
27 em WebP e 1 em JPEG.

### 2026-08-12 — Rolagem animada por conta própria

Depois que o menu passou a funcionar, sobraram dois defeitos no celular: a
página parava **na borda da seção** (só a pontinha do título aparecia) e a
transição era **seca**.

**Diagnóstico da parada na borda.** A rede de segurança anterior só agia quando
o scroll não saía do lugar. Mas o caso real era outro: a rolagem suave do
navegador *começava* e era cancelada no meio pelo gesto de toque, deixando a
página no meio do caminho — situação que a rede não cobria.

**Solução: animar quadro a quadro em JavaScript.** Resolve os dois de uma vez.

- Nada externo cancela a animação, porque ela é nossa. Só o usuário cancela, ao
  rolar de propósito (`wheel`, `touchstart`, `keydown`).
- Curva `1 - (1-t)³`: sai rápido, chega devagar, sem solavanco no fim.
- Duração proporcional à distância, entre 420ms e 1s.
- **Cada passo usa `behavior: "instant"`.** Sem isso o CSS aplicaria `smooth`
  em cima de cada passo e a animação brigaria consigo mesma.
- **Carência de 120ms antes de aceitar cancelamento.** A inércia do gesto
  anterior emite eventos logo após o clique e matava a animação antes de ela
  começar.

**Ponto de parada refeito.** Antes parava na borda da seção, e o respiro
interno (112px) empurrava o título para baixo. Agora mede-se a distância até o
primeiro conteúdo real da seção e consome-se parte dela.

| Seção | Título parava em | Agora |
| --- | --- | --- |
| Onde estamos | ~695px (print do cliente) | **115px** |
| Galeria, Curso, Serviços, Barbeiros, Experiência | — | **115px** |

O cabeçalho tem 91px, então o título fica 24px abaixo dele. A História é a
única exceção proposital: no celular ela começa com uma foto grande, e é a foto
que aparece — que é o começo da seção mesmo.

**Como foi verificado**, já que este painel congela os frames e estrangula os
temporizadores: substituí `requestAnimationFrame` e `performance.now` por um
relógio falso de 60fps. A rolagem progrediu 0 → 5510 → 9618 → 12531 → 14453 →
15590 → 16149 → 16335 → 16353, com passos grandes no começo e curtos no fim —
a curva funcionando.

### 2026-08-12 — Menu: navegação por âncora trocada por rolagem em JS

O `overflow-x: clip` (ver registro abaixo) não bastou: o cliente reportou que os
itens do menu continuavam sem levar às seções no celular.

**Decisão:** parar de depender da navegação nativa por âncora. Criado
`lib/ir-para-secao.ts`, usado pelo menu do topo, pelo menu do celular, pelo
rodapé e pelos botões internos (`Botao` com `href` começando em `#`).

Por que é mais confiável: `window.scrollTo` age sempre sobre a viewport, então
não importa qual elemento o navegador elegeu como contêiner de rolagem. De
quebra, desconta a altura do cabeçalho fixo — antes ele cobria o topo da seção.

Duas armadilhas encontradas ao implementar:

1. **`requestAnimationFrame` na medição.** A primeira versão esperava um frame
   antes de rolar. Desnecessário (o cabeçalho é `fixed`, fechar o menu não muda
   a altura do documento) e ruim: em aba desacelerada pelo navegador, o frame
   demora e a rolagem trava. Removido.
2. **`behavior: "auto"` não é "sem animação".** `auto` manda seguir o que o CSS
   definiu — e o CSS aqui diz `smooth`. Quem pede movimento reduzido continuava
   vendo a página deslizar. O correto é `behavior: "instant"`.

**Ainda falhou no aparelho do cliente.** Terceira rodada, agora sem tentar
descobrir a causa exata — a correção passou a cobrir o sintoma:

- **Rede de segurança.** Em vários navegadores móveis a rolagem suave disparada
  a partir de um toque é cancelada pelo próprio gesto, e a página não anda. Se
  350ms depois do clique o scroll **não tiver saído do lugar**, a rolagem é
  refeita com `behavior: "instant"`. A checagem é "não se moveu", não "não
  chegou": trecho longo leva mais de meio segundo e cortar no meio mataria a
  animação de quem está com ela funcionando.
- **`preventDefault` antes de tudo.** Se qualquer coisa dentro do helper
  falhasse, o navegador caía de volta na navegação nativa — justamente a que
  estava quebrada.
- **`history.replaceState` dentro de `try/catch`.** Em `file://` ele lança
  SecurityError e derrubaria o restante da função.

**Verificado ponta a ponta neste ambiente**, onde a rolagem suave nunca
funciona (o painel congela os frames de animação) — ou seja, exatamente o
cenário de falha do cliente:

| Momento | Scroll |
| --- | --- |
| 200ms após o clique | 0 — a rolagem suave não saiu do lugar |
| 700ms após o clique | no destino — a rede de segurança agiu |

As sete seções param a 91px do topo, logo abaixo do cabeçalho de 90px.
Conferidos também: menu do desktop, rodapé, botão "Conhecer a Punchline" e o
logo (que volta ao topo absoluto, sem descontar o cabeçalho).

O `Botao` deixou de usar o `<Link>` do Next para âncoras internas: para um
`#experiencia`, o roteador reprocessava a rota sem necessidade.

### 2026-08-11 — Menu do celular não navegava: `overflow-x: hidden` no body

Sintoma: clicar num item do menu no celular mudava o endereço para `#servicos`
mas a página não saía do lugar.

**Causa.** O `body` tinha `overflow-x: hidden`. Isso o transforma em contêiner
de rolagem, e o `scroll-behavior: smooth` declarado só no `html` deixa de valer
para o elemento que de fato rola. Resultado: o navegador atualiza o hash e não
executa a rolagem.

Isolado no navegador, alternando só essa propriedade:

| `scroll-behavior` | Resultado |
| --- | --- |
| `auto` | Rola para 7236px ✓ |
| `smooth` | Fica em 0 ✗ |

**Correção.** `overflow-x: clip` no lugar de `hidden`. Os dois cortam o
transbordo horizontal do parallax, mas `clip` **não** cria contêiner de
rolagem. O `hidden` ficou como linha anterior, de reserva para navegadores sem
suporte a `clip`, e o `scroll-behavior` passou a ser declarado em `html` **e**
`body`.

Confirmado depois: `overflow-y` do body voltou a ser `visible`, e as sete
âncoras chegam ao destino.

**Regra:** `overflow-x: hidden` em `html`/`body` quebra rolagem por âncora e
pode quebrar `position: sticky` de descendentes. Usar `clip`.

### 2026-08-11 — Hero mais limpo no celular

O cliente achou a primeira dobra poluída: texto demais e a fotografia quase
invisível.

**Antes:** quatro blocos de texto, conteúdo de 650px numa tela de 812 — sobravam
17px de imagem visível.
**Depois:** só a provocação de abertura fica na dobra. Conteúdo caiu para 469px
e a imagem aparece em **343px**, vinte vezes mais.

Os outros dois parágrafos e o remate desceram para um bloco logo abaixo do
hero, ainda no celular. Nada foi cortado, e a punchline continua vindo depois
da preparação — que é o que faz a piada funcionar.

O véu sobre a foto também foi de 0.42 para 0.30 no celular, e o gradiente
inferior de 256px para 176px. No desktop nada muda.

### 2026-08-11 — Nova seção: Curso

O Felipe também dá curso de barbeiro. Seção criada **depois dos Produtos**: o
público é outro — quem quer aprender o ofício, não quem quer cortar o cabelo —
então ela fica fora do caminho principal, que é o agendamento. O CTA vai para o
WhatsApp, não para o AppBarber.

Foto `curso.jpg`: o barbeiro trabalhando com os certificados emoldurados na
parede ao fundo. É a própria prova de autoridade que a seção precisa. Original
de 599 KB importado para 1120x1400 com 356 KB.

**O texto se apoia só no que já está declarado na seção História** — o estudo
com o Vasilis Serafetinidis e a passagem pela maior rede de barbearia clássica
do Brasil. Nada sobre formato, carga horária, turmas ou valores. → pendência
**P16**.

**Efeito colateral:** o menu foi para 7 itens e em 1024px encostava no logo de
um lado e no botão do outro (folga zero dos dois lados). A barra completa
passou a aparecer só a partir de 1280px; entre 1024 e 1279 vale o hambúrguer.

### 2026-08-11 — Três seções ganham narrativa de scroll no celular

O celular passou a usar o mesmo padrão sticky da Experiência em mais três
lugares. O motivo é sempre o mesmo: conteúdo demais para uma tela de 667px.

| Seção | Antes no celular | Agora |
| --- | --- | --- |
| Experiência | Só texto, sem as imagens do desktop | Imagem abaixo do texto, trocando junto |
| Barbeiros | Dois retratos empilhados (~800px de foto) | Um por vez, trocando no scroll |
| História | Seis parágrafos de enfiada | Dois por vez, em três blocos |

**Tudo medido no iPhone SE (375x667), o pior caso:**

| Seção | Container | Maior conteúdo | Painel usado | Folga |
| --- | --- | --- | --- | --- |
| Experiência | 384px (texto) + 184px (imagem 16/9) | 367px | 641px | 26px |
| Barbeiros | 409px (4/5) | — | 410px | 257px |
| História | 416px | 384px | 417px | 250px |

Duas armadilhas que só apareceram medindo:

1. Na Experiência, encaixar a imagem exigiu reduzir o container de texto de
   26rem para 24rem. O recorte 16/9 não é estético — é o que sobra de altura
   depois do texto.
2. Na História, o container inicial de 19rem cortava os dois primeiros blocos:
   o par com o trecho do Vasilis mede 384px. Subiu para 26rem.

As imagens do desktop e as do celular são os mesmos componentes renderizados
duas vezes, uma delas em `display:none`. Como o `next/image` usa lazy loading
por IntersectionObserver, o que está escondido nunca entra em cena e não chega
a ser baixado.

**Barbeiros** troca em `640px` (o desktop já cabia bem em tablet), enquanto
**História** e **Serviços** trocam em `1024px`.

### 2026-08-11 — Foto da seção História

Saiu o retrato do Felipe, entrou `barbearia-historia.jpg` — o salão com as duas
cadeiras antigas. Faz mais sentido numa seção que conta a história da
barbearia, e não a biografia de uma pessoa.

Original de 11 MB (JPG de câmera), importado para 933x1400 com 236 KB.
Tratamento `grade-room`, não `grade-people`: é ambiente, não pessoa.

**Efeito colateral resolvido:** o card flutuante com "Felipe Cunha / Fundador"
foi removido. Sobre uma foto de cadeiras, ele passaria a legendar o objeto
errado. A assinatura dele continua ao final do texto, junto do remate.

### 2026-08-06 — Indicador de scroll também no celular

O "Role" com o filete dourado animado era `hidden lg:flex`. Passou a aparecer
em todas as telas — no celular é onde ele mais serve, porque a primeira dobra é
quase toda fotografia e nada indica que a página continua.

Um pouco menor no mobile (filete de 36px em vez de 48px) e o padding inferior
do hero subiu de `pb-24` para `pb-32`: com o valor antigo o "Role" encostava no
botão "Conhecer a Punchline" — sobreposição de 3px, medida no navegador.

Conferido em 375x812, 375x667 e 1440x900: 29px de folga no celular, e no
desktop nem chega perto, porque os botões ficam à direita e o indicador no
centro.

### 2026-08-06 — Nova seção: Barbeiros

Criada entre Serviços e Fundador, com os dois barbeiros da casa: **Felipe
Cunha** (Fundador e barbeiro) e **Gabriel Torres** (Barbeiro). Retratos de
estúdio 600x600 entregues pelo cliente em `fotosdabarbearia/barbeiros/`.

- Dois cards com recorte 4/5 e o nome sobre a foto, com véu em gradiente para
  garantir contraste. Preto e branco, como toda foto de pessoa.
- **Tamanho ajustado em 2026-08-06:** em largura cheia cada retrato ficava com
  636x795 no desktop, quase uma tela inteira. O bloco passou a ter no máximo
  860px, e os cards caíram para 410x512 — redução de 35%. O bloco é
  centralizado (`lg:mx-auto`): com a largura menor, sem isso os dois ficavam
  encostados na margem esquerda. No celular nada muda — os cards ocupam a
  largura toda, empilhados.
- Adicionada ao menu do topo, ao rodapé e ao `employee` do Schema — nome e
  função reais ajudam o Google a associar os barbeiros ao negócio.
- O menu passou de 5 para 6 itens; o `gap` foi reduzido em telas `lg` para não
  encostar no logo.
- **CTA único da seção**, não um por barbeiro. Um botão "agendar com o Felipe"
  só é honesto se o AppBarber tiver link direto por profissional. → nova
  pendência **P14**.
- **Sem linha de especialidade** — o cliente dispensou em 2026-08-06. O campo
  foi removido do modelo de dados, não deixado vazio: campo morto vira
  marcador esquecido depois. Cada card mostra só função e nome.

**Ponto a decidir:** Felipe agora aparece em duas seções seguidas — Barbeiros e
Fundador. Não é necessariamente errado (a referência The Beardsmith lista o
fundador entre os barbeiros), mas vale avaliar se as duas se justificam lado a
lado ou se viram uma só.

**Oportunidade:** o novo retrato do Felipe é frontal, limpo e em boa luz — bem
melhor para a seção Fundador do que a foto atual, em que ele aparece sentado na
cadeira como cliente. Trocar depende do aval do cliente.

### 2026-08-06 — Depoimentos com altura igual

No desktop os três cards tinham alturas muito diferentes — o primeiro
depoimento é cerca de três vezes maior que os outros — e o rodapé do bloco
ficava irregular.

Os cards passaram a esticar até a altura do maior (`flex h-full flex-col`), com
a assinatura empurrada para a base (`mt-auto`). As três linhas de baixo se
alinham. Medido: 360px de altura para os três, mesma base, assinaturas no mesmo
nível.

**No celular nada muda** — em coluna única cada card mantém a própria altura
(451, 223, 223), como o cliente pediu.

O respiro que sobra nos cards curtos é intencional e está de acordo com
`specs/design.md` › Layout ("muito espaço negativo").

### 2026-08-06 — Links externos sempre em nova guia

Todo link que sai do domínio abre em nova aba, para o visitante nunca perder a
landing ao conferir o agendamento, o mapa ou o Instagram.

Implementado no componente `Botao`: a regex `EXTERNO` decide entre `<a
target="_blank" rel="noopener noreferrer">` e o `<Link>` do Next. Âncoras
internas (`#servicos`, `#galeria`) continuam na mesma aba — abrir uma nova guia
para rolar a própria página seria um defeito.

O `rel="noopener noreferrer"` não é enfeite: sem ele a página de destino ganha
acesso a `window.opener` e pode redirecionar a aba original.

Também foi adicionado um aviso `sr-only` ("abre em nova guia") nos botões
externos — leitor de tela precisa saber que o contexto vai mudar.

**Auditoria no DOM:** 13 links externos, todos com `_blank` e `noopener`;
14 âncoras internas, nenhuma abrindo aba nova.

### 2026-08-06 — Produtos: quatro fotos, sem repetição

O cliente apontou por print que três das quatro fotos mostravam a mesma
bancada em enquadramentos diferentes. Seleção trocada para `produto-05`,
`produto-03`, `produto-04` e `produto-06`.

**Armadilha encontrada:** `produto-05` e `produto-06` tinham rotação por EXIF —
o arquivo guardava 1400x933 (paisagem), mas o navegador desenhava 933x1400
(retrato). O `sips` e o `mdls` discordavam, e era esse o sinal. A rotação foi
gravada nos pixels para as duas medidas baterem, senão o `object-cover` cortaria
o enquadramento errado.

**Como conferir se uma foto tem esse problema:**

```bash
sips -g pixelWidth -g pixelHeight foto.jpg   # pixels no arquivo
mdls -name kMDItemPixelWidth foto.jpg        # como o navegador desenha
```

Se divergirem, há rotação de EXIF a resolver.

A ordem das quatro no array serve ao mosaico: os dois retratos caem nos slots
3/4 e as duas paisagens nos quadrados, para nenhuma sofrer corte agressivo. Os
`alt` também foram reescritos por foto.

### 2026-08-06 — `useMediaQuery` com `useSyncExternalStore`

A primeira versão do hook usava `useState` + `useEffect`. Problema: o efeito só
roda depois da pintura, então o desktop chegava a renderizar uma vez no layout
de celular antes de se corrigir — visível como um flash na galeria e nos
serviços.

Trocado por `useSyncExternalStore`, que lê o valor já na primeira renderização
do cliente. O snapshot do servidor continua `false`, o layout mais simples.

**Regra:** media query que decide comportamento (não só estilo) usa
`useSyncExternalStore`, nunca `useEffect`.

No mesmo espírito, o `grid-template-columns` da galeria passou a ser calculado
pelo JS em vez de vir de breakpoint do CSS. Antes o número de colunas vinha do
JS e o grid do CSS: se discordassem, a coluna sobrando quebrava para a linha de
baixo.

### 2026-08-05 — Serviços em duas colunas (revisado em 2026-08-06)

Layout pedido pelo cliente: título, parágrafo, CTA e a observação sobre valores
empilhados **à esquerda**; a lista de serviços **à direita**.

**Revisão de 2026-08-06:** a primeira versão desligava a narrativa de scroll no
celular. O cliente pediu o mesmo efeito nas duas telas, e agora **a narrativa
vale em qualquer largura**. O que muda entre elas é só onde o cabeçalho fica.

Medição que fundamentou a solução, em 375x667 (iPhone SE):

| | Altura |
| --- | --- |
| Cabeçalho | 399px |
| Maior grupo (Cortes) | 331px |
| Espaçamentos | ~70px |
| **Total** | **800px** — contra 667px de tela |

Pinar cabeçalho e lista juntos no celular cortaria conteúdo. Solução:

- **Desktop:** as duas colunas do grid têm a mesma altura (400svh), então o
  cabeçalho fica pinado ao lado da lista durante toda a narrativa.
- **Celular:** o grid vira bloco, o cabeçalho rola normalmente e só a lista
  fica fixa. O painel fixo passa a medir 424px e cabe em qualquer aparelho.

**Uma estrutura só, sem duplicar markup.** O truque é o cabeçalho ser
`lg:sticky` dentro de um item de grid que estica até a altura da linha: no
desktop ele pina, no celular o `lg:` simplesmente não se aplica. Duplicar o
bloco criaria dois `<h2>` iguais no DOM, ruim para leitor de tela e para SEO.

Com isso o `useMediaQuery` saiu desta seção — continua em uso só na Galeria.

### 2026-08-05 — CTA flutuante: menor e sem cobrir o rodapé

O botão cobria os links de Instagram, WhatsApp e Mapa ao chegar no fim da
página. Duas mudanças:

- Tamanho reduzido: de `px-6 py-4` / 0.75rem para `px-4 py-2.5` / 0.65rem no
  mobile, e o rótulo encurtou de "Chamar no WhatsApp" para "WhatsApp".
- Passou a se recolher ao chegar no rodapé.

**Troca de mecanismo:** a visibilidade saiu do `scrollY` do Framer e passou a
usar dois `IntersectionObserver` — um no hero (`#topo`), outro no rodapé
(`#rodape`). Além de resolver a sobreposição, elimina um listener que
recalculava a cada frame de scroll.

### 2026-08-05 — Terceira rodada: Serviços vira narrativa e hero perde o título

**Serviços agora funciona igual à Experiência.** Um grupo por vez: Cortes
entra, sai, Barba assume, depois Corte e Barba, depois Acabamento. Seção de
`400svh` com bloco fixo e trilha de progresso.

O cabeçalho (título, parágrafo e CTA) ficou **em fluxo normal, acima do bloco
fixo**. Dentro dele, no celular, a soma de título + texto + CTA + lista
estouraria a altura da tela.

**Refatoração:** a lógica de capítulos saiu da Experiência para
`components/motion-primitives.tsx` — `janelaCapitulo`, `useCapitulo` e
`TrilhaCapitulo`. As duas seções usam a mesma implementação, então a proteção
dos offsets da WAAPI e o par opacidade+visibilidade valem para ambas sem
duplicação. Qualquer seção sticky futura deve usar esses primitivos.

**Hero sem título.** O cliente pediu para remover "Corte não é detalhe". O
eyebrow "Nova Santa Rita — RS" subiu para cima do parágrafo, que cresceu para
`text-lg/xl/2xl` por ter virado o texto principal da dobra.

**Cuidado obrigatório:** um `<h1 class="sr-only">` foi adicionado com
"Punchline Barbearia — barbearia clássica em Nova Santa Rita, RS". Sem H1 o
Google perde o sinal mais forte sobre o assunto da página e o leitor de tela
fica sem título principal. O texto está em `hero.tituloAcessivel`.
**Se um título visível voltar ao hero, remover o `sr-only` — dois H1 é pior
que nenhum.**

**Outros:** botão de Serviços virou "Reservar meu horário"; botão de Produtos
virou "Pedir indicação" e passou a apontar para o WhatsApp, não para o
agendamento — indicação de produto é conversa, não reserva.

---

## Aprendizados

### 2026-08-05 — useTransform e os offsets da Web Animations API

Sintoma: `Failed to execute 'animate' on 'Element': Offsets must be
monotonically non-decreasing`, quebrando a página inteira.

Causa: o Framer Motion repassa o intervalo de entrada do `useTransform` como
offsets de keyframe para a WAAPI. Offset negativo ou maior que 1 é rejeitado.
Na seção Experiência, o primeiro capítulo começava em `-0.1` e o último
terminava em `1.1`.

**Regra:** todo intervalo de `useTransform` alimentado por `scrollYProgress`
deve ficar dentro de `[0, 1]`.

### 2026-08-05 — Máscara de revelação decapita acentos

Sintoma: "NÃO É" renderizava como "NAO E" nos títulos display.

Causa: o `overflow-hidden` do mask reveal, somado ao `line-height: 0.86` do
Bebas Neue, cortava tudo que ficava acima da altura de caixa alta — ou seja, os
acentos.

**Regra:** todo wrapper de mask reveal usa `pt-[0.18em] -mt-[0.18em]`. Abre
espaço para o acento sem alterar o layout. Vale para qualquer projeto em
português com tipografia condensada.

### 2026-08-05 — Janelas de capítulo não podem transbordar a fatia

Na sticky narrativa, janelas de opacidade maiores que a própria fatia deixavam
os três capítulos visíveis ao mesmo tempo, com os textos sobrepostos. A janela
tem que caber dentro da fatia, com o cruzamento acontecendo só nas bordas.

### 2026-08-05 — Capítulo fantasma na sticky: opacidade não basta

O cliente relatou que, a partir do capítulo 02, o texto anterior continuava
legível por baixo do próximo. A causa foi a janela de opacidade transbordando a
fatia de cada capítulo, corrigida no mesmo dia.

Como os capítulos vivem empilhados em `absolute inset-0`, opacidade sozinha é
frágil: qualquer resíduo volta a poluir a leitura. Passou a existir também um
`visibility: hidden` derivado da própria opacidade (`< 0.03`). Além de garantir
a limpeza visual, tira os capítulos inativos da árvore de acessibilidade — antes
o leitor de tela anunciava os três de uma vez.

**Regra:** em qualquer troca de conteúdo empilhado, opacidade **e**
visibilidade andam juntas.

### 2026-08-05 — `next build` derruba o `next dev` de forma permanente

Sintoma: `npm run dev` responde 500 em loop com `TypeError: a[d] is not a
function`. No log do servidor aparece também `Could not find the module ...
segment-explorer-node.js#SegmentViewNode in the React Client Manifest`.

Causa: `next build` e `next dev` compartilham a pasta `.next`. Rodar o build
com o servidor de desenvolvimento ligado sobrescreve os manifests que ele está
usando em memória.

**O servidor não se recupera.** Testado: esperar não resolve, salvar um arquivo
para forçar HMR não resolve. Só reiniciando com a pasta limpa.

```bash
pkill -f "next dev" && rm -rf .next && npm run dev
```

**Tentativa que não funcionou:** separar as pastas com
`distDir: process.env.NEXT_DIST_DIR` e `NEXT_DIST_DIR=.next-build` no script de
build. O build continuou escrevendo artefatos em `.next` **e** jogou o export
dentro de `.next-build` em vez de `out/`. Revertido — a solução é
procedimental, não de configuração.

Regra registrada em `CLAUDE.md`.

### 2026-08-05 — Limite da validação visual automatizada

O painel de navegador desta sessão reporta a aba como `hidden`, o que congela o
`requestAnimationFrame`. Consequências: animações `whileInView` ficam paradas em
opacidade 0 e o screenshot não repinta após scroll programático.

**Verificado por pixel:** hero e seção Experiência.
**Verificado por DOM:** todas as 9 seções, títulos, acentuação, 39 marcadores e
carregamento das imagens.
**Pendente de conferência humana:** o restante da experiência de scroll.

---

## Ajustes Aprovados

*(registrar aqui alterações validadas após revisão)*

---

## Melhorias Implementadas

### 2026-08-05 — Primeira versão da landing no ar (estrutura completa)

Nove seções: Hero, Faixa, Experiência (sticky), Serviços, Fundador, Galeria,
Produtos, Prova Social, Localização, Fecho, Rodapé e CTA flutuante.

- Export estático configurado desde o início. `npm run build` gera `out/`
  (6,7 MB) pronto para qualquer hospedagem. First Load JS: 167 kB.
- Todo o conteúdo editável concentrado em `lib/content.ts`. Campos `null`
  renderizam marcador amarelo na página — 39 marcadores ativos.
- Schema LocalBusiness (`HairSalon`) só emite campos com dado real. Endereço,
  telefone, horários e avaliação ficam de fora enquanto estiverem pendentes:
  dado inventado em Schema é pior que Schema incompleto.
- `prefers-reduced-motion` respeitado em todas as animações.
- Assets tratados e otimizados em `public/images` (4,7 MB, 21 arquivos).

---

## Alterações Futuras

### Nova sessão de fotos — lista de fotos necessárias

Prioridade alta. Sem esse material a landing não sustenta o posicionamento.
Orientação geral: **fotografar à noite ou com a luz ambiente reduzida**, luz
direcional lateral, fundo escuro, sem clutter no enquadramento.

**Essenciais**

1. Retrato do Felipe Cunha — vertical, meio corpo, olhando para a câmera, fundo
   escuro. *(desbloqueia a seção Fundador)*
2. Felipe trabalhando — mãos, navalha, tesoura, concentração. 3 a 4 ângulos.
3. Cortes finalizados — 8 a 12 fotos de clientes reais, com autorização de uso
   de imagem. *(desbloqueia a Galeria de Trabalhos)*
4. Barba finalizada e toalha quente — 3 a 4 fotos.
5. Cadeira antiga com iluminação dramática — o ativo mais forte da marca.

**Desejáveis**

6. Ambiente com luz noturna, prateleiras organizadas, sem micro-ondas e sem
   itens pessoais no enquadramento.
7. Produtos em still escuro, fundo neutro, um a três produtos por foto.
8. Vídeo curto de 8 a 15 segundos para o Hero — navalha, tesoura, cadeira,
   movimento lento.
9. Equipe completa, se houver mais barbeiros.

**Antes de fotografar:** despoluir o enquadramento — remover o micro-ondas
adesivado, a garrafa de Jägermeister, embalagens e itens pessoais do campo de
visão.

### Backlog

*(demais ideias e melhorias planejadas mas ainda não executadas)*
