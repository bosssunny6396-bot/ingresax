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

  const primeCost = rev > 0 ? ((food + labor) / rev) * 100 : 0;

  let status = "Healthy";
  if (primeCost >= 60 && primeCost <= 70) status = "Unstable";
  if (primeCost > 70) status = "Critical";

  let largestLeak = "Food & Beverage Cost";
  if (labor > food) largestLeak = "Labor Cost";

  const expectedTransactions = ticket > 0 ? rev / ticket : 0;
  const transactionGap = expectedTransactions - tx;

  let opportunity = 0;

  if (primeCost > 55) {
    opportunity += ((primeCost - 55) / 100) * rev;
  }

  if (transactionGap > 0 && ticket > 0) {
    opportunity += transactionGap * ticket * 0.1;
  }

  return {
    primeCost: primeCost.toFixed(2),
    status,
    largestLeak,
    estimatedOpportunity: opportunity.toFixed(0),
  };
}