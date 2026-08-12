import type { NextConfig } from "next";

// Export estático: o build gera HTML/CSS/JS puros em `out/`, publicáveis em
// hospedagem tradicional (FTP/cPanel) ou na Vercel/Netlify.
// Consequência: nada de rotas de API, Server Actions, ISR ou loader de imagem.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
