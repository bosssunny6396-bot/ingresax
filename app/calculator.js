import { useState } from 'react';

function Calculator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    revenue: '',
    cost: '',
    labor: '',
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => setStep(step + 1);

  return (
    <div className="calculator">
      {step === 1 && (
        <div>
          <input
            type="text"
            name="revenue"
            value={inputs.revenue}
            onChange={handleChange}
            placeholder="Monthly Revenue"
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {/* Add similar inputs for the other steps */}
    </div>
  );
}
export default Calculator;