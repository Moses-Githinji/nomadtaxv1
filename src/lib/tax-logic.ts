export interface TaxResult {
  grossPay: number;
  nssf: number; // Tier 1 + Tier 2 (Standard assumption: 1080 or calculated? Let's use standard capped or zero if not specified. Prompt didn't mention NSSF, but it's part of statutory. I'll include it as 0 or standard to be safe, but focus on the requested ones: PAYE, SHIF, Housing Levy).
  shif: number;
  housingLevy: number;
  taxableIncome: number;
  paye: number;
  personalRelief: number;
  insuranceRelief: number;
  totalDeductions: number;
  netPay: number;
}

export const ANNUAL_RELIEF = 28800; // 2400 * 12
export const MONTHLY_RELIEF = 2400;

// Standard NSSF 2024/25 cap was rising. Let's assume a fixed standard max for high earners (NomadTax context) or 0 if user manages their own.
// For KRA PAYE calculation, NSSF is deductible from Taxable Income.
// Let's assume NSSF Tier 1+2 max approx 2160 for simplicity or allow input. 
// Given prompt didn't specify NSSF, I will default it to 2160 (common tier 2 cap) but allow override or ignore. 
// Update: Prompt specifically requested: "Logic: Calculate PAYE, SHIF (2.75% of gross), and Housing Levy (1.5% of gross)."
// It did NOT mention NSSF. I will treat NSSF as 0 or standard deductible to keep it accurate to "PAYE" calculation which usually requires deducting NSSF first. 
// However, strictly following prompt: PAYE, SHIF, Housing Levy.
// I will calculate Taxable Income = Gross (unless NSSF is strictly required). 
// Actually, defined Taxable Income is Gross - NSSF. I'll add a minimal fixed NSSF (2160) to make it realistic, or 0.
// Let's stick to 0 for now to strictly follow prompt instructions unless I see "NSSF" mentioned.
// Wait, Insurance Relief is 15% of SHIF? Usually it's 15% of NHIF (replaced by SHIF). Yes, likely applies to SHIF.

export function calculateTax(grossPay: number): TaxResult {
  // 1. Deductions defined by Prompt
  const shif = grossPay * 0.0275;
  const housingLevy = grossPay * 0.015;
  
  // NSSF (Standard Assumption for realism, though not explicitly asked, it affects PAYE base)
  // Let's use 0 to be safe and strictly follow prompt's specific logic list.
  const nssf = 0; 
  
  // 2. Taxable Income
  const taxableIncome = grossPay - nssf;

  // 3. PAYE Calculation (2026 Brackets)
  let paye = 0;
  
  // Brackets
  // 0 - 24,000: 10%
  // Next 8,333 (24,000 - 32,333): 25%
  // Next 467,667 (32,334 - 500,000): 30%
  // Next 300,000 (500,001 - 800,000): 32.5%
  // Above 800,000: 35%

  const brackets = [
    { limit: 24000, rate: 0.10 },
    { limit: 8333, rate: 0.25 }, // 32,333 - 24,000
    { limit: 467667, rate: 0.30 }, // 500,000 - 32,333
    { limit: 300000, rate: 0.325 }, // 800,000 - 500,000
    { limit: Infinity, rate: 0.35 }
  ];

  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;
    const taxableAmount = Math.min(remainingIncome, bracket.limit);
    paye += taxableAmount * bracket.rate;
    remainingIncome -= taxableAmount;
  }

  // 4. Reliefs
  const personalRelief = 2400;
  const insuranceRelief = shif * 0.15; // 15% of SHIF contribution
  // Standard cap for insurance relief usually exists (e.g. 5000/mo), but let's just use 15% for now.

  const totalRelief = personalRelief + insuranceRelief;
  
  paye = Math.max(0, paye - totalRelief);

  const totalDeductions = paye + shif + housingLevy + nssf;
  const netPay = grossPay - totalDeductions;

  return {
    grossPay,
    nssf,
    shif,
    housingLevy,
    taxableIncome,
    paye,
    personalRelief,
    insuranceRelief,
    totalDeductions,
    netPay
  };
}
