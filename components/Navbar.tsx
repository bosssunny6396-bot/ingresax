import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href="/" className="logo">
          INGRESAX
        </Link>

   <nav className="nav-links">
  <Link href="/">Inicio</Link>
  <Link href="/calculator">Evaluación</Link>
  <Link href="/insights">Insights</Link>
</nav>

        <Link href="/calculator" className="nav-cta">
          Analizar ahora
        </Link>
      </div>
    </header>
  );
}