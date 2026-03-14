import Link from "next/link";

export default function Home() {
  const steps = 5; // Total steps in the diagnostic
  const currentStep = 2; // For example, if the user is on Step 2

  const progressPercentage = (currentStep / steps) * 100;

  return (
    <main className="hero">
      <div className="left">
        <p className="eyebrow">INGRESAX</p>

        {/* Updated headline */}
        <h1>Optimiza la rentabilidad de tu restaurante en 2 minutos.</h1>

        {/* Updated subheadline */}
        <p className="subtext">
          Detecta fugas de rentabilidad, analiza tu Prime Cost y entiende dónde están los problemas estructurales en tu operación.
        </p>

        {/* Progress Bar */}
        <div className="progress-indicator">
          <p>Paso {currentStep} de {steps}</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

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

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <span>✓ 2 minutos</span>
          <span>✓ sin registro</span>
          <span>✓ resultado inmediato</span>
        </div>
      </div>

      <div className="right dashboard-mockup">
        <div className="panel large-panel">
          <p>Prime Cost</p>
          <h3>64.2%</h3>
          <span>Presión operativa detectada</span>
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
          <p>Oportunidad mensual</p>
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