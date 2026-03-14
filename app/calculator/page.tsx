"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js app router hook

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
  const router = useRouter(); // Initialize Next.js router

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
      setShowResults(true); // Show the "See Detailed Results" button
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Function to redirect to results page using next/navigation
  const goToResults = () => {
    router.push("/results"); // Redirect to the /results page
  };

  return (
    <div className="calculator-box">
      {!showResults ? (
        <>
          <p>Step {step + 1} of {steps.length}</p>
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
          <button onClick={goToResults}>See Detailed Results</button> {/* Button to redirect to results page */}
        </div>
      )}
    </div>
  );
}