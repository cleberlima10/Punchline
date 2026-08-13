import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { negocio } from "@/lib/content";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const descricao =
  "Barbearia clássica em Nova Santa Rita, RS. Corte masculino, barba na navalha e atendimento que trata cada visita como se fosse a primeira.";

const titulo = "Punchline Barbearia — Barbearia Clássica em Nova Santa Rita, RS";

/**
 * Imagem de compartilhamento. Recorte 1200x630 do hero, que é a proporção que
 * WhatsApp, Facebook e LinkedIn esperam — antes daqui saía o hero em 2200x1466
 * com as dimensões declaradas erradas, e a prévia cortava de qualquer jeito.
 *
 * Em JPEG de propósito: geradores de prévia de link são irregulares com WebP,
 * e o compartilhamento por WhatsApp é o principal canal desta barbearia.
 */
const imagemCompartilhamento = "/images/og.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(negocio.dominio),
  title: {
    default: titulo,
    template: "%s | Punchline Barbearia",
  },
  applicationName: "Punchline Barbearia",
  category: "Barbearia",
  description: descricao,
  keywords: [
    "Barbearia Nova Santa Rita",
    "Melhor Barbearia Nova Santa Rita",
    "Barbearia Premium RS",
    "Corte Masculino Nova Santa Rita",
    "Barba e Cabelo Nova Santa Rita",
    "Barbearia Clássica Nova Santa Rita",
  ],
  authors: [{ name: "Punchline Barbearia" }],
  creator: "Punchline Barbearia",
  publisher: "Punchline Barbearia",
  alternates: { canonical: "/" },

  // O iOS transforma números soltos em link de telefone e desalinha o layout.
  // O contato da Punchline é por WhatsApp, com link próprio.
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: negocio.dominio,
    siteName: "Punchline Barbearia",
    title: titulo,
    description: descricao,
    images: [
      {
        url: imagemCompartilhamento,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Cadeira de barbeiro clássica restaurada na Punchline Barbearia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: [imagemCompartilhamento],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${inter.variable}`}>
      <head>
        {/*
          Único domínio externo da página. Abrir a conexão desde já poupa a
          negociação de DNS e TLS quando o Analytics for buscado.
          As fontes não entram aqui: o next/font as serve do próprio domínio.
        */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
