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
  primeCost = Math.min(primeCost, 100);
  const primeCostNumber = Number(primeCost.toFixed(1)); // Round to 1 decimal and prevent exceeding 100%

  // Opportunity Calculation based on the new formula
  const targetPrimeCost = 58; // Default target prime cost
  const primeCostGap = primeCostNumber - targetPrimeCost; // Calculate Prime Cost Gap
  let opportunity = rev * primeCostGap / 100; // Opportunity = Revenue * PrimeCostGap

  let status = "Healthy";
  let operationalInsight = "Operación dentro de rangos saludables.";
  if (primeCostNumber >= 60 && primeCostNumber <= 70) {
    status = "Unstable";
    operationalInsight = "El prime cost está por encima del rango ideal. Revisa costos operativos y turnos.";
  }
  if (primeCostNumber > 70) {
    status = "Critical";
    operationalInsight = "Prime cost crítico. Necesitas una revisión urgente de costo de alimentos y mano de obra.";
  }

  let largestLeak = "Food & Beverage Cost";
  let explanation = "El costo de alimentos y bebidas está impulsando la mayor parte del prime cost.";
  if (labor > food) {
    largestLeak = "Labor Cost";
    explanation = "El costo laboral está impulsando la mayor parte del prime cost. Optimiza turnos y productividad.";
  }

  const expectedTransactions = ticket > 0 ? rev / ticket : 0;
  const transactionGap = expectedTransactions - tx;

  if (transactionGap > 0 && ticket > 0) {
    opportunity += transactionGap * ticket * 0.1;
  }

  return {
    revenue: rev,
    primeCost: primeCostNumber,
    status,
    largestLeak,
    explanation,
    operationalInsight,
    estimatedOpportunity: opportunity.toFixed(0),
    improvement1: Math.round(rev * 0.01),
    improvement3: Math.round(rev * 0.03),
    improvement5: Math.round(rev * 0.05),
  };
}