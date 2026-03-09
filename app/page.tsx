import Link from "next/link";

export default function Home() {
  return (
    <main className="hero">
      <div className="left">
        <p className="eyebrow">INGRESAX</p>

        <h1>Diagnóstico financiero para restaurantes con claridad operativa.</h1>

        <p className="subtext">
          Detecta fugas de rentabilidad, analiza tu Prime Cost y entiende dónde
          está el problema estructural de tu operación.
        </p>

        <ul className="hero-list">
          <li>Analiza costos clave</li>
          <li>Detecta fugas operativas</li>
          <li>Obtén una lectura financiera clara</li>
        </ul>

        <div className="hero-actions">
          <Link href="/calculator" className="primary-btn">
            Analizar ahora
          </Link>
        </div>
      </div>

      <div className="right dashboard-mockup">
        <div className="panel large-panel">
          <p>Prime Cost</p>
          <h3>64.2%</h3>
          <span>Operational pressure detected</span>
        </div>

        <div className="panel-row">
          <div className="panel small-panel">
            <p>Food Cost</p>
            <h4>31.4%</h4>
          </div>

          <div className="panel small-panel">
            <p>Labor Cost</p>
            <h4>32.8%</h4>
          </div>
        </div>

        <div className="panel chart-panel">
          <p>Monthly Opportunity</p>
          <h4>$4,850</h4>
          <div className="fake-chart">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </main>
  );
}