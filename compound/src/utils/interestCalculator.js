// src/utils/interestCalculator.js
export function calculateInterest(principal, apr, days) {
  if (!apr || apr === '--' || apr === 'Error') return principal;

  const numericAPR = parseFloat(apr);
  const dailyRate = numericAPR / 100 / 365;
  return principal * Math.pow(1 + dailyRate, days);
}