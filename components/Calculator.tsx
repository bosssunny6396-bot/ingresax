"use client";

import { useState } from "react";
import { runDiagnostic } from "../lib/calculator";

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
      setShowResults(true);
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
const getStatusColor = (primeCost: number) => {
  if (primeCost < 60) return "#16A34A";
  if (primeCost <= 70) return "#EAB308";
  return "#DC2626";
};

const primeCostValue = Number(results.primeCost);
const statusColor = getStatusColor(primeCostValue);
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

          <div className="button-row">
            {step > 0 && <button onClick={handleBack}>Back</button>}
            <button onClick={handleNext}>
              {step === steps.length - 1 ? "See Results" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="results-panel">
          <p className="results-label">Diagnostic Result</p>
          <h2>Restaurant Financial Snapshot</h2>

         <div className="result-card">
  <span>Prime Cost %</span>
  <strong style={{ color: statusColor }}>{results.primeCost}%</strong>
</div>

         <div className="result-card">
  <span>Status</span>
  <strong style={{ color: statusColor }}>{results.status}</strong>
</div>

          <div className="result-card">
            <span>Largest Operational Leak</span>
            <strong>{results.largestLeak}</strong>
          </div>

          <div className="result-card">
            <span>Estimated Monthly Opportunity</span>
            <strong>${results.estimatedOpportunity}</strong>
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