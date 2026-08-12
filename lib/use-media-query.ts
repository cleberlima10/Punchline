"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query em JavaScript, para quando o comportamento muda — não só o
 * estilo. CSS resolve layout; isto resolve lógica, como desligar uma narrativa
 * de scroll que não cabe na tela do celular.
 *
 * Usa `useSyncExternalStore` em vez do par `useState` + `useEffect`: o valor é
 * lido já na primeira renderização do cliente, e não depois da pintura. Com o
 * efeito, o desktop chegava a renderizar uma vez no layout de celular antes de
 * se corrigir.
 *
 * O snapshot do servidor é sempre `false` — no servidor não existe viewport, e
 * `false` é o layout mais simples, que serve de ponto de partida seguro.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (aoMudar: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", aoMudar);
      return () => mql.removeEventListener("change", aoMudar);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
