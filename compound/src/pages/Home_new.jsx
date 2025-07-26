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
  const [calculationType, setCalculationType] = useState('lending');

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    console.log(`🔄 Token changed to: ${newToken}`);
  };

  const handleCalculationTypeChange = (event, newType) => {
    if (newType !== null) {
      setCalculationType(newType);
      setResult(null);
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
        interest: (finalBalance - amount).toFixed(2),
        calculationType,
        isRealData: true 
      });
      setChartData(data);

    } catch (error) {
      console.error('❌ Error calculating interest:', error);
      // Fallback rates
      const fallbackRate = calculationType === 'lending' ? 2.5 : 4.5;
      const finalBalance = calculateInterest(amount, fallbackRate, days);
      
      const data = [];
      data.push({ name: 'Day 0', value: parseFloat(amount) });
      for (let i = 1; i <= days; i++) {
        const balance = calculateInterest(amount, fallbackRate, i);
        data.push({ name: `Day ${i}`, value: parseFloat(balance.toFixed(2)) });
      }
      
      setResult({ 
        amount, 
        days, 
        finalBalance, 
        token,
        apr: `${fallbackRate}% (fallback)`,
        interest: (finalBalance - amount).toFixed(2),
        calculationType,
        isRealData: false 
      });
      setChartData(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box className="glow-card" textAlign="center" p={4} mb={4}>
        <Typography variant="h3" className="electric-text" gutterBottom>
          ⚡ DeFi Interest Calculator
        </Typography>
        <Typography variant="h6" sx={{ color: '#bfdbfe', mb: 3 }}>
          Calculate real Compound Protocol rates for lending and borrowing
        </Typography>
        
        {/* Calculation Type Toggle */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 1, 
            bgcolor: 'rgba(30, 41, 59, 0.8)', 
            border: '1px solid rgba(147, 197, 255, 0.3)',
            borderRadius: 2,
            display: 'inline-block'
          }}
        >
          <ToggleButtonGroup
            value={calculationType}
            exclusive
            onChange={handleCalculationTypeChange}
            sx={{
              '& .MuiToggleButton-root': {
                color: '#94a3b8',
                border: 'none',
                px: 3,
                py: 1,
                '&.Mui-selected': {
                  bgcolor: calculationType === 'lending' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: calculationType === 'lending' ? '#4ade80' : '#f87171',
                  '&:hover': {
                    bgcolor: calculationType === 'lending' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                  }
                },
                '&:hover': {
                  bgcolor: 'rgba(147, 197, 255, 0.1)',
                }
              }
            }}
          >
            <ToggleButton value="lending">
              💰 Lending Calculator
            </ToggleButton>
            <ToggleButton value="borrowing">
              🏦 Borrowing Calculator
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Box>

      {/* Calculator Components */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TokenSelector token={token} onTokenChange={handleTokenChange} />
        <InterestForm onCalculate={handleCalculate} loading={loading} calculationType={calculationType} />
        {result && <ResultsDisplay result={result} />}
        {chartData.length > 0 && <InterestChart data={chartData} calculationType={calculationType} />}
      </Box>
    </Box>
  );
}
