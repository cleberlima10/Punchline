import Script from "next/script";
import { analytics } from "@/lib/content";

/**
 * Google Analytics 4.
 *
 * O ID vem de `lib/content.ts`, junto com o resto dos dados do negócio. Uma
 * variável `NEXT_PUBLIC_GA_ID` sobrescreve, caso algum ambiente precise medir
 * em outra propriedade.
 *
 * Sem nenhum dos dois, **nada é renderizado**: nenhum script, nenhuma
 * requisição, nenhum cookie.
 *
 * `afterInteractive` faz o script carregar depois que a página fica utilizável,
 * para a medição não competir com a renderização do conteúdo. É a estratégia
 * que a própria documentação do Next recomenda para Analytics.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID || analytics.id;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
