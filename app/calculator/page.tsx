import Calculator from "../../components/Calculator";

export default function CalculatorPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0B0B0B", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", color: "white" }}>
        <p style={{ color: "#9CA3AF", marginBottom: "10px" }}>INGRESAX Diagnostic</p>

        <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>
          Evalúa la salud financiera de tu restaurante
        </h1>

        <p style={{ color: "#9CA3AF", maxWidth: "700px", margin: "0 auto 30px" }}>
          Esta evaluación analiza los números básicos de tu restaurante para detectar posibles fugas de ingresos.
        </p>
      </div>

      <Calculator />

      <section className="faq-section">
        <div className="faq-container">
          <h2>Preguntas frecuentes</h2>

          <div className="faq-item">
            <h3>¿Cuánto tarda?</h3>
            <p>La evaluación toma solo unos minutos y entrega un resultado inmediato.</p>
          </div>

          <div className="faq-item">
            <h3>¿Qué datos se necesitan?</h3>
            <p>Solo necesitas ventas mensuales, costo de alimentos y bebidas, costo laboral, ticket promedio y transacciones mensuales.</p>
          </div>

          <div className="faq-item">
            <h3>¿Qué recibe el usuario?</h3>
            <p>Recibes una lectura inicial de Prime Cost, estado operativo, posible fuga principal y una estimación de oportunidad mensual.</p>
          </div>

          <div className="faq-final-cta">
            <a
              href="[PASTE YOUR CALENDLY LINK HERE]"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
            >
              Analizar con INGRESAX
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}