export function runDiagnostic({
  revenue,
  foodCost,
  laborCost,
  averageTicket,
  transactions,
}) {
  const rev = Number(revenue) || 0;
  const food = Number(foodCost) || 0;
  const labor = Number(laborCost) || 0;
  const ticket = Number(averageTicket) || 0;
  const tx = Number(transactions) || 0;

  // Prime Cost Calculation with validation
  let primeCost = 0;

  // Validation rules
  if (rev <= 0) {
    return {
      error: "El costo no puede ser mayor que las ventas mensuales.", // Error message if revenue is zero or less
    };
  }

  if (food > rev || labor > rev) {
    return {
      error: "El costo no puede ser mayor que las ventas mensuales.", // Validation error if cost exceeds revenue
    };
  }

  // Formula: Prime Cost = (Food Cost + Labor Cost) / Revenue * 100
  primeCost = ((food + labor) / rev) * 100;

  // Ensure Prime Cost is not more than 100% and round to 1 decimal
  primeCost = Math.min(primeCost, 100).toFixed(1); // Round to 1 decimal and prevent exceeding 100%

  // Opportunity Calculation based on the new formula
  const targetPrimeCost = 58; // Default target prime cost
  const primeCostGap = primeCost - targetPrimeCost; // Calculate Prime Cost Gap
  let opportunity = rev * primeCostGap / 100; // Opportunity = Revenue * PrimeCostGap

  let status = "Healthy";
  if (primeCost >= 60 && primeCost <= 70) status = "Unstable";
  if (primeCost > 70) status = "Critical";

  let largestLeak = "Food & Beverage Cost";
  if (labor > food) largestLeak = "Labor Cost";

  const expectedTransactions = ticket > 0 ? rev / ticket : 0;
  const transactionGap = expectedTransactions - tx;

  if (transactionGap > 0 && ticket > 0) {
    opportunity += transactionGap * ticket * 0.1;
  }

  return {
    primeCost,
    status,
    largestLeak,
    estimatedOpportunity: opportunity.toFixed(0),
  };
}