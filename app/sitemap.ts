import type { MetadataRoute } from "next";
import { negocio } from "@/lib/content";

/**
 * Sitemap gerado pelo Next (`app/sitemap.ts`), que é o caminho nativo — no
 * build com `output: "export"` ele vira um `sitemap.xml` estático em `out/`.
 *
 * O site é uma landing page única: as seções são âncoras da mesma URL, não
 * páginas. Listar `#servicos` e companhia aqui seria errado, porque o Google
 * indexa URLs, não fragmentos.
 *
 * A `/404` fica de fora de propósito: página de erro não se indexa.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${negocio.dominio}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

/**
 * Obrigatório com `output: "export"`: sem isto o Next trata a rota como
 * dinâmica e o build falha ao tentar gerar o arquivo.
 */
export const dynamic = "force-static";
