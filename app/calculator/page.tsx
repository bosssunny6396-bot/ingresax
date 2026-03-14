"use client";

import { useState } from "react";
import { useNavigate } from "../../lib/useNavigate";

const steps = [
  {
    name: "revenue",
    label: "Monthly Revenue",
    placeholder: "Enter monthly revenue",
  },
  {
    name: "foodCost",
    label: "Food & Beverage Cost",
    placeholder: "Enter food & beverage cost",
  },
  {
    name: "laborCost",
    label: "Labor Cost",
    placeholder: "Enter labor cost",
  },
  {
    name: "averageTicket",
    label: "Average Ticket",
    placeholder: "Enter average ticket",
  },
  {
    name: "transactions",
    label: "Monthly Transactions",
    placeholder: "Enter monthly transactions",
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
  const navigate = useNavigate();

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
      alert("Please fill this field first.");
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }

    setShowResults(true);

    setResults({
      primeCost: 64.2,
      status: "Operational Pressure",
      largestLeak: "Labor Cost",
      estimatedOpportunity: 3600,
      score: 72,
      operationalInsight:
        "When labor cost exceeds the healthy range, it usually indicates scheduling problems or low employee productivity.",
    });
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      return;
    }

    if (step > 0) {
      setStep(step - 1);
    }
  };

  const goToResults = () => {
    navigate("/results");
  };

  return (
    <div className="calculator-box">
      <p>
        Step {step + 1} of {steps.length}
      </p>
      <h2>{currentStep.label}</h2>

      <input
        type="number"
        name={currentStep.name}
        value={inputs[currentStep.name as keyof typeof inputs]}
        onChange={handleChange}
        placeholder={currentStep.placeholder}
      />

      <div className="button-row">
        {step > 0 && <button onClick={handleBack}>Back</button>}
        <button onClick={handleNext}>
          {step === steps.length - 1 ? "See Results" : "Next"}
        </button>
      </div>

      {showResults && results && (
        <div className="results-panel">
          <h3>Results</h3>
          <div className="result-card">
            <span>Prime Cost %</span>
            <strong>{results.primeCost}%</strong>
          </div>

          <div className="result-card">
            <span>Industry Range</span>
            <strong>55â60%</strong>
          </div>

          <div className="result-card">
            <span>Status</span>
            <strong>{results.status}</strong>
          </div>

          <div className="result-card">
            <span>Largest Operational Leak</span>
            <strong>{results.largestLeak}</strong>
          </div>

          <div className="result-card">
            <span>Estimated Monthly Opportunity</span>
            <strong>${results.estimatedOpportunity}</strong>
          </div>

          <div className="button-row">
            <button onClick={goToResults}>See Detailed Results</button>
          </div>
        </div>
      )}

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
    </div>
  );
}
