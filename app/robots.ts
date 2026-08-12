import type { MetadataRoute } from "next";
import { negocio } from "@/lib/content";

/**
 * robots.txt gerado pelo Next (`app/robots.ts`) — no build com
 * `output: "export"` vira um arquivo estático em `out/`.
 *
 * O site é público inteiro: não há área administrativa, login nem API (o
 * export estático não permite rotas de servidor). Por isso a liberação é
 * total, com uma única exceção: `/_next/static/chunks/` **não** é bloqueado.
 *
 * Esse é o erro clássico em robots.txt de projeto Next — bloquear `/_next/`
 * parece limpeza, mas impede o Google de baixar CSS e JavaScript, e aí ele
 * renderiza a página quebrada e avalia o site por isso.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${negocio.dominio}/sitemap.xml`,
    host: negocio.dominio,
  };
}

/**
 * Obrigatório com `output: "export"`: sem isto o Next trata a rota como
 * dinâmica e o build falha ao tentar gerar o arquivo.
 */
export const dynamic = "force-static";
