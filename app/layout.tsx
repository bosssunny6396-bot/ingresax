import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Ingresax",
  description: "Diagnóstico financiero para restaurantes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
  <body>
     <Navbar />
    {children}  {/* Ensure this is properly rendering the content */}
  </body>
</html>
  );
}
