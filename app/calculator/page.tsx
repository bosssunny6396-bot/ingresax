"use client";

import { useState } from "react";
import { useNavigate } from "../../lib/useNavigate"; // Use custom hook to mimic React Router's useNavigate

const steps = [
  {
    name: "revenue",
    label: "Ingresos Mensuales",
    placeholder: "Ingrese los ingresos mensuales",
  },
  {
    name: "foodCost",
    label: "Costo de Alimentos y Bebidas",
    placeholder: "Ingrese el costo de alimentos y bebidas",
  },
  {
    name: "laborCost",
    label: "Costo Laboral",
    placeholder: "Ingrese el costo laboral",
  },
  {
    name: "averageTicket",
    label: "Ticket Promedio",
    placeholder: "Ingrese el ticket promedio",
  },
  {
    name: "transactions",
    label: "Transacciones Mensuales",
    placeholder: "Ingrese las transacciones mensuales",
  },
];

export default function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    revenue: "",
    foodCost: "",
    laborCost: "",
    averageTicket: "",
    transactions: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate(); // Use next/navigation for routing

  const currentStep = steps[step];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    const currentValue = inputs[currentStep.name as keyof typeof inputs];

    if (!currentValue) {
      alert("Por favor, complete este campo primero.");
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);

      // Calculate Prime Cost
      const rev = parseFloat(inputs.revenue);
      const food = parseFloat(inputs.foodCost);
      const labor = parseFloat(inputs.laborCost);
      const primeCost = rev > 0 ? ((food + labor) / rev) * 100 : 0;

      // Opportunity Calculation
      const opportunity = (primeCost - 55) / 100 * rev; // Correct Opportunity calculation formula

      // Check for Revenue Inconsistency
      const ticket = parseFloat(inputs.averageTicket);
      const transactions = parseFloat(inputs.transactions);
      const expectedRevenue = ticket * transactions;
      if (expectedRevenue !== rev) {
        alert(`Verifique sus números. La cantidad de ingresos calculados a partir del ticket promedio y las transacciones es $${expectedRevenue}, pero los ingresos ingresados son $${rev}`);
      }

      // Simulated Results (Replace with real calculation logic)
      const simulatedResults = {
        primeCost: primeCost.toFixed(1),
        status: primeCost < 60 ? "Saludable" : primeCost <= 70 ? "Presión Operativa" : "Riesgo",
        largestLeak: food > labor ? "Costo de Alimentos y Bebidas" : "Costo Laboral",
        estimatedOpportunity: opportunity.toFixed(0),
        score: 72,
        operationalInsight:
          "Cuando el costo laboral supera el rango saludable, suele indicar problemas de programación de turnos o baja productividad por empleado.",
      };

      setResults(simulatedResults);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Navigate to Results Page
  const goToResults = () => {
    navigate("/results"); // Navigate to the /results page
  };

  return (
    <div className="calculator-box">
      <p>Paso {step + 1} de {steps.length}</p>
      <h2>{currentStep.label}</h2>

      <input
        type="number"
        name={currentStep.name}
        value={inputs[currentStep.name as keyof typeof inputs]}
        onChange={handleChange}
        placeholder={currentStep.placeholder}
      />

      <div className="button-row">
        {step > 0 && <button onClick={handleBack}>Atrás</button>}
        <button onClick={handleNext}>
          {step === steps.length - 1 ? "Ver Resultados" : "Siguiente"}
        </button>
      </div>

      {showResults && results && (
        <div className="results-panel">
          <h3>Resultados</h3>

          <div className="result-card">
            <span>Costo principal %</span>
            <strong>{results?.primeCost}%</strong>
          </div>

          <div className="result-card">
            <span>Gama de la industria</span>
            <strong>55% to 60%</strong> {/* Fixed broken encoding issue */}
          </div>

          <div className="result-card">
            <span>Estado</span>
            <strong>{results?.status}</strong>
          </div>

          <div className="result-card">
            <span>La mayor fuga operativa</span>
            <strong>{results?.largestLeak}</strong>
          </div>

          <div className="result-card">
            <span>Oportunidad mensual estimada</span>
            <strong>${results?.estimatedOpportunity}</strong>
          </div>

          <div className="button-row">
            <button onClick={goToResults}>Ver resultados detallados</button>
          </div>
        </div>
      )}

      {/* FAQ Section */}
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
              href="https://calendly.com/ingresax/diagnostico"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
            >
              Analizar con INGRESAX
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}