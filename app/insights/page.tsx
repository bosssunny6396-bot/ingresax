import Link from "next/link";
export default function InsightsPage() {
  const posts = [
    {
      title: "Cómo entender tu Prime Cost",
      description: "Una guía rápida para interpretar el indicador más importante de rentabilidad operativa.",
    },
    {
      title: "Dónde se esconden las fugas de rentabilidad",
      description: "Señales comunes de problemas estructurales en costos, personal y operación diaria.",
    },
    {
      title: "Qué números debe revisar un restaurante cada mes",
      description: "Los indicadores básicos para tomar decisiones con mayor claridad financiera.",
    },
  ];

  return (
    <main className="insights-page">
      <section className="insights-hero">
        <p className="eyebrow">Insights</p>
        <h1>Ideas y diagnósticos para mejorar la rentabilidad del restaurante</h1>
        <p className="subtext">
          Contenido breve sobre Prime Cost, estructura de costos y claridad operativa.
        </p>
      </section>

      <section className="insights-grid">
        {posts.map((post, index) => (
          <article className="insight-card" key={index}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
           <Link href={`/insights/${index}`} className="primary-btn">
  Read more
</Link>
          </article>
        ))}
      </section>
    </main>
  );
}