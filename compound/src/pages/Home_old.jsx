// src/pages/Home.jsx
import React, { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import TokenSelector from '../components/TokenSelector';
import InterestForm from '../components/InterestForm';
import ResultsDisplay from '../components/ResultsDisplay';
import InterestChart from '../components/InterestChart';
import { calculateInterest } from '../utils/interestCalculator';

export default function Home() {
  const [token, setToken] = useState('DAI');
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculationType, setCalculationType] = useState('lending'); // New state for toggle

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    console.log(`🔄 Token changed to: ${newToken}`);
  };

  const handleCalculationTypeChange = (event, newType) => {
    if (newType !== null) {
      setCalculationType(newType);
      setResult(null); // Clear previous results
      setChartData([]);
    }
  };

  const handleCalculate = async ({ amount, days }) => {
    if (!amount || !days) return;

    setLoading(true);

    try {
      // Get live APR from Compound III based on calculation type
      const { getSupplyRate, getBorrowRate } = require('../utils/compound');
      console.log(`🔄 Calculating for ${calculationType}: ${token}, amount: ${amount}, days: ${days}`);
      
      const apr = calculationType === 'lending' 
        ? await getSupplyRate(token)    // Supply rate for lending
        : await getBorrowRate(token);   // Borrow rate for borrowing

      console.log(`✅ Successfully fetched ${token} ${calculationType} rate: ${apr.toFixed(3)}%`);

      // Calculate interest using live APR
      const finalBalance = calculateInterest(amount, apr, days);

      // Generate chart data
      const data = [];
      if (calculationType === 'lending') {
        // For lending: show growth
        data.push({ name: 'Day 0', value: parseFloat(amount) });
        for (let i = 1; i <= days; i++) {
          const balance = calculateInterest(amount, apr, i);
          data.push({ name: `Day ${i}`, value: parseFloat(balance.toFixed(2)) });
        }
      } else {
        // For borrowing: show debt growth
        data.push({ name: 'Day 0', value: parseFloat(amount) });
        for (let i = 1; i <= days; i++) {
          const debt = calculateInterest(amount, apr, i);
          data.push({ name: `Day ${i}`, value: parseFloat(debt.toFixed(2)) });
        }
      }

      // Update results with token + apr
      setResult({ 
        amount, 
        days, 
        finalBalance, 
        token,
        apr: apr.toFixed(3) + `% (Real Compound V3 ${calculationType === 'lending' ? 'Supply' : 'Borrow'} Rate)`,
        isRealData: true 
      });
      setChartData(data);
    } catch (error) {
      console.error('Failed to fetch live APR:', error);
      // Don't show alert, just use default rate silently
      console.log('🔄 Using default rate of 4.5%');
      const apr = 4.5;
      const finalBalance = calculateInterest(amount, apr, days);
      
      // Generate chart data with default rate
      const data = [];
      data.push({ name: 'Day 0', value: parseFloat(amount) });
      for (let i = 1; i <= days; i++) {
        const balance = calculateInterest(amount, apr, i);
        data.push({ name: `Day ${i}`, value: parseFloat(balance.toFixed(2)) });
      }
      
      setResult({ 
        amount, 
        days, 
        finalBalance, 
        token, 
        apr: '4.5% (fallback)',
        isRealData: false 
      });
      setChartData(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="glow-card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '1rem' }}>
        <h2 style={{
          margin: 0,
          color: '#f1f5f9',
          fontWeight: '600',
          fontSize: '1.8rem',
          animation: 'glow 2s ease-in-out infinite',
          fontFamily: '"Inter", sans-serif'
        }}>
          ⚡ Compound Interest Calculator
        </h2>
        <p style={{
          margin: '0.5rem 0 0 0',
          color: '#cbd5e1',
          fontSize: '1rem'
        }}>
          See how your assets grow over time using Compound Finance.
        </p>

        <style jsx>{`
          @keyframes glow {
            0%, 100% {
              text-shadow: 0 0 5px #f1f5f9, 0 0 10px #f1f5f9;
            }
            21% {
              text-shadow: 0 0 10px #f8fafc, 0 0 20px #f8fafc;
            }
          }
        `}</style>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {/* Left Side */}
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <TokenSelector onTokenChange={handleTokenChange} />
          <InterestForm token={token} onCalculate={handleCalculate} loading={loading} />
          <ResultsDisplay result={result} />
        </div>

        {/* Right Side */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {chartData.length > 0 ? (
            <InterestChart data={chartData} />
          ) : (
            <div className="chart-container" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#cbd5e1' }}>Enter values to see the interest growth chart.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}