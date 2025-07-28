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
        {/* Demo Scenarios Section */}
        <Box className="glow-card" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#60a5fa', mb: 2 }}>
            🚀 Try These Demo Scenarios
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            justifyContent: 'center' 
          }}>
            <Box
              onClick={() => handleCalculate({ amount: '1000', days: '30' })}
              sx={{
                cursor: 'pointer',
                p: 2,
                border: '1px solid #93c5fd',
                borderRadius: 2,
                bgcolor: 'rgba(34, 197, 94, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(34, 197, 94, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(34, 197, 94, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'bold' }}>
                💰 Monthly Lending
              </Typography>
              <Typography variant="body2" sx={{ color: '#bfdbfe' }}>
                $1,000 for 30 days
              </Typography>
            </Box>
            
            <Box
              onClick={() => handleCalculate({ amount: '5000', days: '365' })}
              sx={{
                cursor: 'pointer',
                p: 2,
                border: '1px solid #93c5fd',
                borderRadius: 2,
                bgcolor: 'rgba(34, 197, 94, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(34, 197, 94, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(34, 197, 94, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'bold' }}>
                📈 Yearly Investment
              </Typography>
              <Typography variant="body2" sx={{ color: '#bfdbfe' }}>
                $5,000 for 1 year
              </Typography>
            </Box>
            
            <Box
              onClick={() => handleCalculate({ amount: '10000', days: '90' })}
              sx={{
                cursor: 'pointer',
                p: 2,
                border: '1px solid #93c5fd',
                borderRadius: 2,
                bgcolor: 'rgba(34, 197, 94, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(34, 197, 94, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(34, 197, 94, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 'bold' }}>
                🎯 Quarterly Goal
              </Typography>
              <Typography variant="body2" sx={{ color: '#bfdbfe' }}>
                $10,000 for 90 days
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Top Row: Token Selector and Results Display */}
        <Box sx={{ 
          display: 'flex', 
          gap: 3,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start'
        }}>
          <Box sx={{ flex: 1 }}>
            <TokenSelector token={token} onTokenChange={handleTokenChange} />
          </Box>
          <Box sx={{ 
            flex: 1,
            minHeight: '200px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            {result ? (
              <Box sx={{ width: '100%' }}>
                <ResultsDisplay result={result} />
              </Box>
            ) : (
              <Box sx={{ 
                width: '100%', 
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                textAlign: 'center',
                p: 3
              }}>
                <Typography variant="h6" sx={{ color: '#60a5fa', mb: 2 }}>
                  📊 Results Preview
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                  Your calculation results will appear here
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  border: '1px dashed #475569', 
                  borderRadius: 2,
                  bgcolor: 'rgba(30, 41, 59, 0.3)',
                  width: '100%',
                  maxWidth: '300px'
                }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                    📈 Expected Information:
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                    • Final balance amount<br/>
                    • Interest earned/paid<br/>
                    • Real APR from Compound<br/>
                    • Calculation breakdown
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Bottom Row: Interest Form and Chart */}
        <Box sx={{ 
          display: 'flex', 
          gap: 3,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start'
        }}>
          <Box sx={{ flex: 1 }}>
            <InterestForm onCalculate={handleCalculate} loading={loading} calculationType={calculationType} />
          </Box>
          <Box sx={{ 
            flex: 1,
            minHeight: '400px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            {chartData.length > 0 ? (
              <Box sx={{ width: '100%' }}>
                <InterestChart data={chartData} calculationType={calculationType} />
              </Box>
            ) : (
              <Box sx={{ 
                width: '100%', 
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                textAlign: 'center',
                p: 3
              }}>
                <Typography variant="h6" sx={{ color: '#60a5fa', mb: 2 }}>
                  📈 Interactive Chart
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                  Dynamic growth visualization will appear here
                </Typography>
                <Box sx={{ 
                  p: 3, 
                  border: '1px dashed #475569', 
                  borderRadius: 2,
                  bgcolor: 'rgba(30, 41, 59, 0.3)',
                  width: '100%',
                  maxWidth: '350px'
                }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                    📊 Chart Features:
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                    • Day-by-day growth tracking<br/>
                    • Interactive data points<br/>
                    • Color-coded lending/borrowing<br/>
                    • Responsive design<br/>
                    • Real-time updates
                  </Typography>
                  <Box sx={{ 
                    mt: 2, 
                    p: 1, 
                    bgcolor: 'rgba(96, 165, 250, 0.1)', 
                    borderRadius: 1,
                    border: '1px solid rgba(96, 165, 250, 0.3)'
                  }}>
                    <Typography variant="caption" sx={{ color: '#60a5fa' }}>
                      💡 Tip: Try the demo scenarios above!
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
