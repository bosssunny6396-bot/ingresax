export default function InsightArticle({
  params,
}: {
  params: { slug: string };
}) {
  const articles: any = {
    0: {
      title: "Cómo entender tu Prime Cost",
      content:
        "Prime Cost es uno de los indicadores más importantes en la operación de un restaurante. Representa la suma del costo de alimentos y bebidas más el costo laboral. Cuando este número supera el 70%, normalmente indica presión operativa o problemas estructurales en costos.",
    },
    1: {
      title: "Dónde se esconden las fugas de rentabilidad",
      content:
        "Las fugas de rentabilidad suelen aparecer en tres áreas principales: costos de alimentos, gestión del personal y procesos operativos. Un diagnóstico financiero ayuda a identificar exactamente dónde se pierde margen.",
    },
    2: {
      title: "Qué números debe revisar un restaurante cada mes",
      content:
        "Cada restaurante debería monitorear Prime Cost, ventas totales, ticket promedio y costos laborales mensuales. Estos indicadores permiten detectar problemas antes de que afecten gravemente la rentabilidad.",
    },
  };

  const article = articles[params.slug];

  if (!article) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <main style={{ maxWidth: "800px", margin: "80px auto", color: "white" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        {article.title}
      </h1>

      <p style={{ color: "#9CA3AF", lineHeight: "1.8", fontSize: "18px" }}>
        {article.content}
      </p>
    </main>
  );
}