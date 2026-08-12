# specs/design.md — Punchline Barbearia

Documento principal de design, experiência, UX, UI, direção criativa e
posicionamento visual do projeto.

Este documento é a **fonte da verdade visual**. Qualquer pedido que contradiga o
que está aqui deve interromper o trabalho e ser sinalizado antes de qualquer
alteração.

---

# Visão Geral

A Punchline Barbearia é uma marca premium que une a tradição da barbearia
clássica com a sofisticação do design contemporâneo.

O objetivo da experiência digital não é apenas apresentar serviços.

O objetivo é transmitir:

- Exclusividade
- Autoridade
- Confiança
- Excelência
- Status
- Experiência Premium

O visitante deve sentir que está entrando em uma marca diferenciada desde o
primeiro segundo.

---

# Conceito da Marca

A Punchline é uma barbearia clássica com mentalidade moderna.

**Deve transmitir:**

- Sofisticação
- Exclusividade
- Confiança
- Masculinidade
- Elegância
- Tradição
- Profissionalismo

**Evitar:**

- Visual genérico
- Visual de barbearia vintage exagerada
- Layout comum de WordPress
- Componentes com aparência de template
- Poluição visual
- Elementos caricatos

---

# Referências Visuais

Mistura entre:

- Apple
- Raycast
- Linear
- Stripe
- Awwwards
- Barbearias premium internacionais

A sensação geral deve ser de:

- Luxo minimalista
- Tecnologia premium
- Design editorial
- Alta qualidade visual

---

# Personalidade

A comunicação deve ser:

- Profissional
- Confiante
- Elegante
- Refinada
- Direta
- Exclusiva

**Nunca:**

- Infantil
- Popular demais
- Excessivamente informal
- Engraçada em excesso

---

# Paleta de Cores

| Papel              | Valor                    | Uso                                   |
| ------------------ | ------------------------ | ------------------------------------- |
| Primária           | `#0F0F0F`                | Fundos, Hero, seções principais       |
| Secundária         | `#1A1A1A`                | Containers, cards, blocos             |
| Destaque           | `#C9A86A`                | CTAs, links, elementos premium        |
| Texto principal    | `#FFFFFF`                | Títulos e texto de leitura            |
| Texto secundário   | `#B3B3B3`                | Apoio, legendas, descrições           |
| Bordas             | `rgba(255,255,255,0.08)` | Divisores, contornos de card          |

**Primária — `#0F0F0F`**
Utilizada em: fundos, hero, seções principais.

**Secundária — `#1A1A1A`**
Utilizada em: containers, cards, blocos.

**Cor de Destaque — `#C9A86A`**
Utilizada em: CTAs, links, elementos premium.

**Texto Principal — `#FFFFFF`**

**Texto Secundário — `#B3B3B3`**

**Bordas — `rgba(255,255,255,0.08)`**

---

# Tipografia

**Títulos:** Bebas Neue
Alternativas: Oswald, Anton.

Os títulos devem transmitir força, presença e autoridade.

**Textos:** Inter
Alternativas: Manrope, Geist.

Os textos devem ser extremamente legíveis.

---

# Layout

Luxo minimalista.

Características:

- Muito espaço negativo
- Grandes áreas de respiro
- Seções amplas
- Grid moderno
- Hierarquia visual forte
- Conteúdo respirando

---

# Experiência de Navegação

A navegação possui a mesma importância do design visual.

Características:

- Cinemática
- Fluida
- Imersiva
- Sofisticada
- Elegante

---

# Assets Disponíveis no Projeto

Existe uma pasta chamada `/fotosdabarbearia`.

Ela contém materiais reais da Punchline Barbearia.

**Sempre priorizar esses materiais antes de utilizar placeholders ou imagens
genéricas.**

Estrutura:

```
/fotosdabarbearia
├── barbearia/          19 arquivos
├── donoDaBarbearia/     1 arquivo
└── produtos/            8 arquivos
```

## Pasta: barbearia

Contém fotos reais do ambiente da Punchline.

Utilizar para:

- Hero
- Sobre a Barbearia
- Estrutura Física
- Experiência Punchline
- Sessões institucionais

Objetivo: demonstrar qualidade, estrutura e profissionalismo.

## Pasta: donoDaBarbearia

Contém fotos de referência do proprietário.

Nome: **Felipe Cunha**

Utilizar para:

- Conheça o Fundador
- Autoridade
- Storytelling
- Construção de confiança

Objetivo: humanizar a marca.

Sempre que fizer sentido, criar uma seção contando a história do Felipe e da
Punchline.

> **Nota de inventário:** hoje existe **apenas 1 foto** nesta pasta. Uma seção de
> fundador com narrativa longa provavelmente exigirá mais material. Sinalizar
> antes de projetar uma seção que dependa de múltiplas imagens do Felipe.

## Pasta: produtos

Contém fotos dos produtos comercializados.

Utilizar para:

- Sessão de Produtos
- Cuidados com cabelo e barba
- Upsell de serviços
- Conteúdo visual complementar

Objetivo: mostrar que a Punchline oferece uma experiência completa de cuidados
masculinos.

---

# Direção Fotográfica

*Adicionado em 2026-08-05, após auditoria completa dos 28 assets reais. Ver
análise em `memoria.md`.*

O acervo atual é heterogêneo: a foto do Felipe é um preto e branco editorial de
alto contraste, enquanto as fotos do salão têm luz do dia chapada, parede verde
e clutter no enquadramento. Sem tratamento, misturar as duas quebra a percepção
premium.

**Regra unificadora: monocromático + acento dourado.**

1. **Todas as fotos de pessoas** — preto e branco de alto contraste, sem
   exceção. Alinha tudo ao padrão da foto do Felipe.
2. **Fotos de ambiente** — dessaturação forte (85–100%) com leve viés quente,
   nunca em cor plena. Elimina o verde da parede, que é o principal ruído.
3. **Fotos de produto e detalhe** — dessaturação parcial (60–80%), preservando
   apenas o suficiente para o produto ser reconhecível.
4. **A única cor saturada da página é o `#C9A86A`.** Ela pertence à interface —
   CTAs, links, filetes, números — nunca à fotografia.
5. **Grading obrigatório:** overlay `#0F0F0F` em gradiente, contraste alto,
   sombras fechadas.
6. **Crops fechados** sempre que o enquadramento original mostrar clutter.
7. **Fotos amplas do salão nunca em full-bleed claro** — apenas como camada de
   fundo muito escurecida e/ou desfocada, em parallax.
8. **Zero imagens de banco** misturadas às reais.

**Hierarquia dos assets — o que é herói e o que é apoio:**

| Nível | Material | Uso |
| --- | --- | --- |
| Herói | Retrato do Felipe (P&B) | Fundador, e possivelmente o Hero |
| Herói | Cadeiras antigas em close | Hero, Experiência, transições |
| Forte | Ferramentas sobre superfície escura | Serviços, detalhes, texturas |
| Apoio | Produtos em crop fechado | Seção Produtos |
| Fundo | Fotos amplas do salão | Camadas de parallax escurecidas |

---

# Referências de Movimento e Experiência

Existe uma pasta de referências: `specs/referencia1`.

> **Nota de localização:** atualmente a pasta está na **raiz do projeto**
> (`/referencia1`), não dentro de `specs/`. Enquanto não for movida, ler
> `/referencia1`. Ver pendência registrada em `memoria.md`.

Essa pasta contém:

- Capturas de tela
- Inspirações
- Sites de referência
- Referências de animação
- Referências de experiência

Conteúdo atual:

- `Websites, Shops & Mehr | Amphora` — https://amphora-it.com/
- `Gentlemen Barber Clubs` (link + captura PNG) — https://www.gentlemen-barberclubs.de/
- `The Beardsmith` (link + PDF) — https://www.thebeardsmith.com/

**Antes de desenvolver qualquer componente ou seção, analisar completamente todo
o conteúdo dessa pasta.**

---

# Regra Fundamental

**Não copiar layouts.**

**Não copiar identidade visual.**

**Não copiar componentes.**

Utilizar apenas:

- Linguagem de movimento
- Ritmo da navegação
- Estrutura da experiência
- Sensação visual
- Comportamento do scroll
- Direção artística

Toda identidade visual deve seguir exclusivamente a marca Punchline Barbearia.

---

# Referência Principal de Movimento

**Amphora — Websites, Shops & Mehr** (https://amphora-it.com/)

Utilizar como principal referência para:

- Scroll cinematográfico
- Transições suaves
- Profundidade visual
- Camadas animadas
- Narrativa durante a navegação

---

# Scroll Experience

O scroll deve contar uma história.

O visitante não deve perceber mudanças bruscas entre seções.

Cada bloco deve surgir naturalmente.

A página deve parecer viva.

---

# Parallax Layers

Criar camadas independentes.

Exemplos:

- Imagens em velocidades diferentes
- Objetos desacelerados
- Textos com movimento suave
- Elementos flutuantes

---

# Scroll Reveal

Conforme o usuário navega:

- Fotos aparecem gradualmente
- Cards emergem suavemente
- Títulos revelam através de máscara
- Blocos deslizam elegantemente

---

# Sticky Sections

Sempre que agregar valor:

- Fixar conteúdo temporariamente
- Trocar informações durante o scroll
- Construir narrativa visual

Referências: Apple, Stripe, Amphora.

---

# Profundidade Visual

Utilizar:

- Parallax
- Blur progressivo
- Escala dinâmica
- Sobreposição de camadas
- Layer Movement

---

# Hero Section

A primeira dobra deve impressionar imediatamente.

Deve conter:

- Imagem ou vídeo fullscreen
- Overlay escuro sofisticado
- Headline impactante
- Subheadline persuasiva
- CTA principal
- CTA secundário
- Indicador animado de scroll

---

# Animações

Priorizar **Framer Motion**.
Utilizar **GSAP apenas para interações avançadas**.

**Efeitos permitidos:**

- Fade In
- Blur Reveal
- Scale Reveal
- Parallax
- Scroll Trigger
- Mask Reveal
- Layer Movement
- Sticky Scroll Animations

**Efeitos proibidos:**

- Elementos piscando
- Bounce exagerado
- Rotações excessivas
- Efeitos datados

---

# Galeria de Trabalhos

A galeria deve ser uma experiência.

**Não utilizar grids simples.**

Características:

- Layout Pinterest Premium
- Profundidade visual
- Fotos surgindo conforme scroll
- Escalas variadas
- Movimento suave

---

# Cards

Visual:

- Glassmorphism discreto
- Bordas suaves
- Hover elegante
- Profundidade sutil

---

# Botões

Características:

- Premium
- Elegantes
- Levemente arredondados
- Responsivos

Adicionar microinterações sofisticadas.

---

# Conversão

Toda seção deve responder: **"Por que escolher a Punchline?"**

Toda seção deve possuir CTA contextual.

---

# Provas Sociais

Explorar fortemente:

- Avaliações Google
- Depoimentos
- Trabalhos realizados
- Reputação local

> Nenhum número, avaliação ou depoimento pode ser inventado. Usar apenas dados
> reais fornecidos. Ver pendências em `memoria.md`.

---

# SEO

**Keywords:**

- Barbearia Nova Santa Rita
- Melhor Barbearia Nova Santa Rita
- Barbearia Premium RS
- Corte Masculino Nova Santa Rita
- Barba e Cabelo Nova Santa Rita
- Barbearia Clássica Nova Santa Rita

**Implementar:**

- Open Graph
- Schema LocalBusiness
- Metadata completa
- SEO técnico

---

# Sensação Final Desejada

Ao finalizar a navegação, o visitante deve sentir:

> "Essa não é apenas uma barbearia comum."

> "Quero agendar meu horário agora."

A experiência deve parecer um projeto digno de Awwwards.
