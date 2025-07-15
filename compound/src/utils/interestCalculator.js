// src/utils/interestCalculator.js
export function calculateInterest(principal, apr, days) {
  const dailyRate = apr / 100 / 365;
  return principal * Math.pow(1 + dailyRate, days);
}