// src/pages/Home.jsx
import React, { useState } from 'react';
import TokenSelector from '../components/TokenSelector';
import InterestForm from '../components/InterestForm';
import ResultsDisplay from '../components/ResultsDisplay';
import InterestChart from '../components/InterestChart';
import { calculateInterest } from '../utils/interestCalculator';

export default function Home() {
  const [token, setToken] = useState('DAI');
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

  const handleTokenChange = (newToken, rate) => {
    setToken(newToken);
  };

  const handleCalculate = ({ amount, days }) => {
    const apr = 4.5;
    const finalBalance = calculateInterest(amount, apr, days);

    // Generate chart data (daily growth)
    const data = [];
    for (let i = 1; i <= days; i++) {
      const balance = calculateInterest(amount, apr, i);
      data.push({ name: `${i} day`, value: balance });
    }

    setResult({ amount, days, finalBalance });
    setChartData(data);
  };

  return (
    <div>
      
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

  {/* Add this style inside your component or in index.css */}
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
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Left Side */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <TokenSelector onTokenChange={handleTokenChange} />
          <InterestForm token={token} onCalculate={handleCalculate} />
          <ResultsDisplay result={result} />
        </div>

        {/* Right Side */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {chartData.length > 0 ? (
            <InterestChart data={chartData} />
          ) : (
            <div className="chart-container" style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Enter values to see the interest growth chart.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}