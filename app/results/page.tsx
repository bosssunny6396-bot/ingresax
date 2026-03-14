"use client";

import { useEffect, useState } from "react";
import { runDiagnostic } from "../../lib/calculator"; // Adjust the import path as necessary

export default function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      const inputValues = {
        revenue: 60000,
        foodCost: 18000,
        laborCost: 20000,
        averageTicket: 25,
        transactions: 2400,
      };
      const res = runDiagnostic(inputValues);
      setResults(res);
      setIsLoading(false);
    }, 1500); // Simulate loading state
  }, []);

  const getStatusColor = (primeCost: number) => {
    if (primeCost < 60) return "#16A34A"; // Healthy (Green)
    if (primeCost <= 70) return "#EAB308"; // Unstable (Orange)
    return "#DC2626"; // Risk (Red)
  };

  const primeCostValue = Number(results?.primeCost);
  const statusColor = getStatusColor(primeCostValue);

  return (
    <div className="results-page">
      {isLoading ? (
        <div className="loading-screen">
          <p>Calculando diagnóstico...</p>
        </div>
      ) : (
        <>
          {/* Page Header */}
          <header className="results-header">
            <h1>Restaurant Financial Snapshot</h1>
            <div className="score">
              <p>INGRESAX Score</p>
              <h2>{results?.score} / 100</h2>
              <p className="status" style={{ color: statusColor }}>
                Estado: {results?.status}
              </p>
            </div>
          </header>

          {/* Prime Cost Card */}
          <div className="result-card">
            <span>Prime Cost %</span>
            <strong style={{ color: statusColor }}>{results?.primeCost}%</strong>
            <span>Rango saludable: 55–60%</span>
            <span>Diferencia: {results?.primeCost > 60 ? `${(results.primeCost - 60).toFixed(1)}% por encima del rango` : `${(60 - results.primeCost).toFixed(1)}% por debajo del rango`}</span>
          </div>

          {/* Operational Leak Card */}
          <div className="result-card">
            <span>Principal fuga operativa</span>
            <strong>{results?.largestLeak}</strong>
            <p>{results?.explanation}</p>
          </div>

          {/* Opportunity Card */}
          <div className="result-card">
            <span>Oportunidad estimada</span>
            <strong>${results?.estimatedOpportunity} / mes</strong>
            <strong>${(Number(results?.estimatedOpportunity) * 12).toFixed(0)} / año</strong>
            <span>Esto representa aproximadamente {((results?.estimatedOpportunity / results?.revenue) * 100).toFixed(1)}% de tus ingresos actuales.</span>
          </div>

          {/* Improvement Scenario */}
          <div className="result-card">
            <h3>Escenario de mejora</h3>
            <ul>
              <li>1% mejora: +${results?.improvement1} / mes</li>
              <li>3% mejora: +${results?.improvement3} / mes</li>
              <li>5% mejora: +${results?.improvement5} / mes</li>
            </ul>
          </div>

          {/* Operational Insight */}
          <div className="result-card">
            <h3>Insight operativo</h3>
            <p>{results?.operationalInsight}</p>
          </div>

          {/* Primary CTA */}
          <div className="cta-container">
            <a href="https://calendly.com/ingresax/diagnostico" className="primary-cta">
              Descubrir fugas operativas exactas
            </a>
          </div>

          {/* Secondary CTA */}
          <div className="cta-container">
            <a href="#" className="secondary-cta">
              Descargar resumen financiero
            </a>
          </div>

          {/* Footer Micro Branding */}
          <footer className="micro-branding">
            <p>INGRESAX Diagnostic Engine v1</p>
          </footer>
        </>
      )}
    </div>
  );
}