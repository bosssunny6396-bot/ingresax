"use client";

import { useState } from "react";
import { runDiagnostic } from "../lib/calculator";

const steps = [
  {
    name: "revenue",
    label: "Monthly Revenue",
    placeholder: "Enter monthly revenue",
    instructions: "Use an approximate average of the last 3 months.",
  },
  {
    name: "foodCost",
    label: "Food & Beverage Cost",
    placeholder: "Enter food & beverage cost",
    instructions: "Use the average cost of food and beverage for the last month.",
  },
  {
    name: "laborCost",
    label: "Labor Cost",
    placeholder: "Enter labor cost",
    instructions: "Use the average labor cost for the last month.",
  },
  {
    name: "averageTicket",
    label: "Average Ticket",
    placeholder: "Enter average ticket",
    instructions: "Average sales per customer during the last month.",
  },
  {
    name: "transactions",
    label: "Monthly Transactions",
    placeholder: "Enter monthly transactions",
    instructions: "Use the total number of transactions made in the last month.",
  },
];

export default function Calculator() {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [inputs, setInputs] = useState({
    revenue: "",
    foodCost: "",
    laborCost: "",
    averageTicket: "",
    transactions: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setShowResults(true);
        setIsLoading(false);
      }, 1500); // Simulate a 1.5-second delay
    }
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

  const results = runDiagnostic(inputs);
  const hasError = typeof (results as any).error === "string";

  const primeCost = typeof results.primeCost === "number" ? results.primeCost : 0;

  const getStatusColor = (primeCost: number) => {
    if (primeCost < 60) return "#16A34A"; // Healthy (Green)
    if (primeCost <= 70) return "#EAB308"; // Unstable (Yellow)
    return "#DC2626"; // Critical (Red)
  };

  const statusColor = getStatusColor(primeCost);

  return (
    <div className="calculator-box">
      {!showResults ? (
        <>
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

          <p className="input-instructions">{currentStep.instructions}</p>

          <div className="button-row">
            {step > 0 && <button onClick={handleBack}>Back</button>}
            <button onClick={handleNext}>
              {step === steps.length - 1 ? "See Results" : "Next"}
            </button>
          </div>

          {isLoading && <p>Calculando diagnóstico...</p>}
        </>
      ) : (
        <div className="results-panel">
          {hasError ? (
            <>
              <p className="results-label">Error</p>
              <p className="diagnostic-warning">{(results as any).error}</p>
              <div className="button-row">
                <button onClick={handleBack}>Back</button>
              </div>
            </>
          ) : (
            <>
              <p className="results-label">Diagnostic Result</p>
              <h2>Restaurant Financial Snapshot</h2>

              {/* Prime Cost Section */}
              <div className="result-card">
                <span>Prime Cost %</span>
                <strong style={{ color: statusColor }}>{primeCost}%</strong>
              </div>

          {/* Industry Range Section */}
          <div className="result-card">
            <span>Industry Range</span>
            <strong>55–60%</strong>
          </div>

          {/* Gap Section */}
          <div className="result-card">
            <span>Gap</span>
            <strong>
              {primeCost > 0
                ? primeCost > 60
                  ? `${(primeCost - 60).toFixed(1)}% por encima del rango`
                  : `${(60 - primeCost).toFixed(1)}% por debajo del rango`
                : "N/A"}
            </strong>
          </div>

          {/* Status Section */}
          <div className="result-card">
            <span>Status</span>
            <strong style={{ color: statusColor }}>{(results as any).status ?? "N/A"}</strong>
          </div>

          {/* Largest Operational Leak */}
          <div className="result-card">
            <span>Largest Operational Leak</span>
            <strong>{(results as any).largestLeak ?? "N/A"}</strong>
          </div>

          {/* Estimated Monthly Opportunity Section */}
          <div className="result-card">
            <span>Estimated Monthly Opportunity</span>
            <strong>${(results as any).estimatedOpportunity ?? "0"}</strong>
          </div>

          <p className="diagnostic-warning">
            Tu Prime Cost puede indicar un problema estructural.
          </p>

          <div className="button-row">
            <button onClick={handleBack}>Back</button>
            <a
              href="https://calendly.com/ingresax/diagnostico"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              Descubrir fugas operativas exactas
            </a>
          </div>
        </div>
      )}
    </div>
  );
}