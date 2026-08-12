"use client";

/**
 * Rolagem para uma seção, animada por conta própria.
 *
 * Por que não usar o `scroll-behavior: smooth` do navegador: no celular, uma
 * rolagem suave disparada a partir de um toque é frequentemente cancelada pelo
 * próprio gesto. Ela ou não começa, ou para no meio do caminho — foi o que
 * acontecia aqui, com o usuário chegando na borda da seção em vez de nela.
 *
 * Animando quadro a quadro nós mandamos na duração, na curva e no ponto final.
 * Cada passo usa `behavior: "instant"` de propósito: sem isso o CSS aplicaria
 * `smooth` em cima de cada passo e a animação brigaria consigo mesma.
 */

/** Curva do projeto: sai rápido, chega devagar. Nada de solavanco no fim. */
function suavizar(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Percursos curtos não precisam de tanto tempo quanto atravessar a página. */
function duracaoPara(distancia: number) {
  const base = 420 + Math.abs(distancia) * 0.12;
  return Math.min(1000, Math.max(420, base));
}

let cancelarAnimacaoAtual: (() => void) | null = null;

function animarAte(destino: number) {
  cancelarAnimacaoAtual?.();

  const inicio = window.scrollY;
  const distancia = destino - inicio;
  if (Math.abs(distancia) < 2) return;

  const duracao = duracaoPara(distancia);
  const comeco = performance.now();
  let ativo = true;

  // Se a pessoa resolver rolar no meio do caminho, ela manda — a animação sai
  // da frente na hora.
  //
  // A carência de 120ms existe porque a inércia do gesto anterior (trackpad,
  // ou o próprio toque que abriu o menu) ainda emite eventos logo depois do
  // clique, e sem ela a animação morreria antes de começar.
  const CARENCIA = 120;
  const desistir = () => {
    if (performance.now() - comeco < CARENCIA) return;
    ativo = false;
    limpar();
  };
  const limpar = () => {
    window.removeEventListener("wheel", desistir);
    window.removeEventListener("touchstart", desistir);
    window.removeEventListener("keydown", desistir);
    cancelarAnimacaoAtual = null;
  };

  window.addEventListener("wheel", desistir, { passive: true });
  window.addEventListener("touchstart", desistir, { passive: true });
  window.addEventListener("keydown", desistir);
  cancelarAnimacaoAtual = desistir;

  const passo = (agora: number) => {
    if (!ativo) return;

    const progresso = Math.min(1, (agora - comeco) / duracao);
    window.scrollTo({
      top: Math.round(inicio + distancia * suavizar(progresso)),
      behavior: "instant",
    });

    if (progresso < 1) {
      requestAnimationFrame(passo);
    } else {
      limpar();
    }
  };

  requestAnimationFrame(passo);
}

export function irParaSecao(href: string) {
  if (!href.startsWith("#")) return false;

  const alvo = document.getElementById(href.slice(1));
  if (!alvo) return false;

  const cabecalho = document.querySelector("header");
  const recuo = cabecalho ? cabecalho.getBoundingClientRect().height : 0;

  /*
   * As seções têm um respiro generoso no topo. Parar exatamente na borda fazia
   * a tela abrir em espaço vazio, com o título só espiando lá embaixo.
   *
   * Em vez de ler o `padding` da seção — que às vezes mora num elemento
   * interno —, medimos a distância até o primeiro conteúdo de verdade e
   * consumimos parte dela. Assim o título aparece logo, sem colar no
   * cabeçalho.
   */
  const primeiroConteudo = alvo.querySelector(
    "h1, h2, h3, p, .eyebrow, ul, li",
  );
  const respiro = primeiroConteudo
    ? primeiroConteudo.getBoundingClientRect().top -
      alvo.getBoundingClientRect().top
    : 0;
  const ajuste = Math.min(Math.max(respiro - 24, 0), 96);

  const destino = Math.max(
    0,
    Math.round(alvo.getBoundingClientRect().top + window.scrollY - recuo + ajuste),
  );

  const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (suave) {
    animarAte(destino);
  } else {
    window.scrollTo({ top: destino, behavior: "instant" });
  }

  // `file://` bloqueia manipulação de histórico. Se falhar, a rolagem já
  // aconteceu e o endereço é o de menos.
  try {
    history.replaceState(null, "", href);
  } catch {
    /* endereço não atualiza, e tudo bem */
  }

  return true;
}
