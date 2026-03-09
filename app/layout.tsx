import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "INGRESAX | Diagnóstico financiero para restaurantes",
  description:
    "Diagnóstico financiero para restaurantes. Analiza Prime Cost, detecta fugas operativas y encuentra oportunidades de mejora.",
  openGraph: {
    title: "INGRESAX | Diagnóstico financiero para restaurantes",
    description:
      "Analiza Prime Cost, detecta fugas operativas y encuentra oportunidades de mejora.",
    url: "https://ingresax.com",
    siteName: "INGRESAX",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}