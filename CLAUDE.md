# CLAUDE.md — Punchline Barbearia

Arquivo principal do projeto. Mantido enxuto de propósito.
Todo o detalhamento de design, UX e direção criativa vive em `specs/design.md`.
Todo o histórico de decisões vive em `memoria.md`.

---

## Objetivo do Projeto

Landing page premium para a **Punchline Barbearia** — Nova Santa Rita, RS.

O objetivo principal é **converter visitantes em agendamentos** através de uma
experiência digital memorável.

O foco não é apenas design bonito. O foco é criar uma experiência premium de
navegação capaz de gerar desejo, transmitir confiança e aumentar a conversão.

---

## Posicionamento da Marca

A Punchline não vende cortes de cabelo e barba.
A Punchline vende **experiência, confiança, autoestima, exclusividade e
excelência no atendimento**.

Barbearia clássica com mentalidade moderna: tradição e técnica clássica
combinadas com uma experiência moderna e sofisticada.

**Público-alvo:** homens de 18 a 50 anos que valorizam aparência, atendimento de
qualidade, experiência diferenciada, ambiente premium e profissionais
especializados.

**A página deve transmitir:** sofisticação, exclusividade, confiança,
masculinidade, elegância, autoridade e experiência premium.

O visitante deve sentir que está diante da melhor barbearia da região antes
mesmo de chegar ao final da página.

---

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion (animação principal)
- GSAP (apenas quando necessário, para interações avançadas)

**Publicação:** o site vai ao ar em domínio próprio. Configurar **export estático**
(`output: 'export'` + `images: { unoptimized: true }`) desde o início, para que o
build gere HTML/CSS/JS puros, publicáveis tanto em hospedagem tradicional
(FTP/cPanel) quanto na Vercel/Netlify.

Consequência prática: **não usar recursos de servidor** — sem rotas de API, sem
Server Actions, sem ISR, sem `next/image` com loader padrão.

---

## Regras Gerais

1. **Se algum pedido meu contradisser o que já está definido em
   `specs/design.md`, pare imediatamente e me avise antes de realizar qualquer
   alteração.**
2. Não assumir informações. Não inventar conteúdo (serviços, preços, horários,
   depoimentos, números, nomes). Se faltar dado, perguntar.
3. Caso qualquer referência ou documentação não seja suficiente para tomar uma
   decisão sozinho, perguntar antes de implementar.
4. Sempre priorizar consistência com a identidade da Punchline Barbearia.
5. Sempre priorizar os assets reais da empresa antes de placeholders ou imagens
   genéricas.
6. Não copiar layouts, identidade visual ou componentes das referências —
   apenas linguagem de movimento e direção artística (ver `specs/design.md`).
7. Registrar toda decisão relevante em `memoria.md`.

---

## Fluxo de Trabalho

**Antes de iniciar qualquer tarefa:**

1. Ler `CLAUDE.md`
2. Ler `specs/design.md`
3. Ler `memoria.md`
4. Ler `specs/referencia1` *(pasta de referências de movimento e experiência —
   ver nota de localização em `specs/design.md` › Referências de Movimento)*
5. Ler os assets reais da empresa em `/fotosdabarbearia`

**Nunca rodar `npm run build` com o `npm run dev` ligado.**

Os dois usam a pasta `.next`. O build sobrescreve os arquivos que o servidor de
desenvolvimento está usando, e a página passa a devolver erro 500 com
`TypeError: a[d] is not a function` em loop. O servidor **não se recupera
sozinho** — nem esperando, nem salvando um arquivo.

Se acontecer:

```bash
pkill -f "next dev" && rm -rf .next && npm run dev
```

**Durante a tarefa:**

- Seguir integralmente `specs/design.md`.
- Em caso de conflito entre pedido e spec → parar e avisar.
- Em caso de informação faltante → perguntar, nunca inventar.

**Ao concluir a tarefa:**

- Registrar em `memoria.md` o que foi decidido, ajustado ou aprendido.

---

## Referências

- [`specs/design.md`](specs/design.md) — documento principal de design,
  experiência, UX, UI, direção criativa e posicionamento visual. É a fonte da
  verdade visual do projeto.
- [`memoria.md`](memoria.md) — histórico de decisões, feedbacks, aprendizados,
  ajustes aprovados e pendências.
- `/fotosdabarbearia` — assets reais da empresa (`barbearia/`,
  `donoDaBarbearia/`, `produtos/`).
- `specs/referencia1` — referências de movimento, animação e experiência.
