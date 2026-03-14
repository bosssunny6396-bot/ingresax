[1mdiff --git a/components/Calculator.tsx b/components/Calculator.tsx[m
[1mindex 870a1b6..927adc3 100644[m
[1m--- a/components/Calculator.tsx[m
[1m+++ b/components/Calculator.tsx[m
[36m@@ -141,12 +141,12 @@[m [mconst statusColor = getStatusColor(primeCostValue);[m
           <div className="button-row">[m
             <button onClick={handleBack}>Back</button>[m
             <a[m
[31m-              href="https://calendly.com/yourname/diagnostic"[m
[32m+[m[32m              href="https://calendly.com/ingresax/diagnostico"[m
               target="_blank"[m
               rel="noopener noreferrer"[m
               className="cta-link"[m
             >[m
[31m-              Schedule Full Diagnostic[m
[32m+[m[32m               Descubrir fugas operativas exactas[m
             </a>[m
           </div>[m
         </div>[m
[1mdiff --git a/lib/calculator.js b/lib/calculator.js[m
[1mindex 5312bb2..f0b8716 100644[m
[1m--- a/lib/calculator.js[m
[1m+++ b/lib/calculator.js[m
[36m@@ -11,7 +11,32 @@[m [mexport function runDiagnostic({[m
   const ticket = Number(averageTicket) || 0;[m
   const tx = Number(transactions) || 0;[m
 [m
[31m-  const primeCost = rev > 0 ? ((food + labor) / rev) * 100 : 0;[m
[32m+[m[32m  // Prime Cost Calculation with validation[m
[32m+[m[32m  let primeCost = 0;[m
[32m+[m
[32m+[m[32m  // Validation rules[m
[32m+[m[32m  if (rev <= 0) {[m
[32m+[m[32m    return {[m
[32m+[m[32m      error: "El costo no puede ser mayor que las ventas mensuales.", // Error message if revenue is zero or less[m
[32m+[m[32m    };[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  if (food > rev || labor > rev) {[m
[32m+[m[32m    return {[m
[32m+[m[32m      error: "El costo no puede ser mayor que las ventas mensuales.", // Validation error if cost exceeds revenue[m
[32m+[m[32m    };[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  // Formula: Prime Cost = (Food Cost + Labor Cost) / Revenue * 100[m
[32m+[m[32m  primeCost = ((food + labor) / rev) * 100;[m
[32m+[m
[32m+[m[32m  // Ensure Prime Cost is not more than 100% and round to 1 decimal[m
[32m+[m[32m  primeCost = Math.min(primeCost, 100).toFixed(1); // Round to 1 decimal and prevent exceeding 100%[m
[32m+[m
[32m+[m[32m  // Opportunity Calculation based on the new formula[m
[32m+[m[32m  const targetPrimeCost = 58; // Default target prime cost[m
[32m+[m[32m  const primeCostGap = primeCost - targetPrimeCost; // Calculate Prime Cost Gap[m
[32m+[m[32m  let opportunity = rev * primeCostGap / 100; // Opportunity = Revenue * PrimeCostGap[m
 [m
   let status = "Healthy";[m
   if (primeCost >= 60 && primeCost <= 70) status = "Unstable";[m
[36m@@ -23,18 +48,12 @@[m [mexport function runDiagnostic({[m
   const expectedTransactions = ticket > 0 ? rev / ticket : 0;[m
   const transactionGap = expectedTransactions - tx;[m
 [m
[31m-  let opportunity = 0;[m
[31m-[m
[31m-  if (primeCost > 55) {[m
[31m-    opportunity += ((primeCost - 55) / 100) * rev;[m
[31m-  }[m
[31m-[m
   if (transactionGap > 0 && ticket > 0) {[m
     opportunity += transactionGap * ticket * 0.1;[m
   }[m
 [m
   return {[m
[31m-    primeCost: primeCost.toFixed(2),[m
[32m+[m[32m    primeCost,[m
     status,[m
     largestLeak,[m
     estimatedOpportunity: opportunity.toFixed(0),[m
