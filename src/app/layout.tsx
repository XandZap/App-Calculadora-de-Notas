import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grade Calculator for FAMETRO Students",
  description:
    "Calculadora de Aprovação — FAMETRO. Preencha as notas já obtidas e simule sua média parcial e final.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        {/* Script do AdSense — tag nativa para aparecer no HTML estático */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1815564810673303"
          crossOrigin="anonymous"
        />
        {/* Metatag de verificação */}
        <meta
          name="google-adsense-account"
          content="ca-pub-1815564810673303"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
