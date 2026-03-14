import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ingresax",
  description: "Diagnóstico financiero para restaurantes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
