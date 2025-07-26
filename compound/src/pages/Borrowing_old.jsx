// src/pages/Borrowing.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, Card, CardContent, Alert, LinearProgress } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';
import { getBorrowRate } from '../utils/compound';
import { usePortfolio } from '../context/PortfolioContext';

const tokens = [
  { symbol: 'DAI', name: 'Dai Stablecoin', color: '#f59e0b' },
  { symbol: 'USDC', name: 'USD Coin', color: '#3b82f6' },
  { symbol: 'ETH', name: 'Ethereum', color: '#8b5cf6' }
];

export default function Borrowing() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [amounts, setAmounts] = useState({});
  const [borrowing, setBorrowing] = useState({});
  const { portfolio, addBorrowedAsset } = usePortfolio();

  // Use portfolio data instead of hardcoded values
  const collateralValue = portfolio.totalSupplied;
  const totalBorrowed = portfolio.totalBorrowed;

  useEffect(() => {
    const fetchRates = async () => {
      const newRates = {};
      for (const token of tokens) {
        try {
          const rate = await getBorrowRate(token.symbol);
          newRates[token.symbol] = rate;
        } catch (error) {
          console.error(`Failed to fetch borrow rate for ${token.symbol}:`, error);
          newRates[token.symbol] = 0;
        }
      }
      setRates(newRates);
      setLoading(false);
    };

    fetchRates();
  }, []);

  const handleBorrow = async (token) => {
    const amount = amounts[token];
    if (!amount || amount <= 0) return;

    setBorrowing(prev => ({ ...prev, [token]: true }));
    
    // Simulate transaction
    setTimeout(() => {
      setBorrowing(prev => ({ ...prev, [token]: false }));
      setAmounts(prev => ({ ...prev, [token]: '' }));
      
      // Add to portfolio
      const rate = rates[token] || 4.5;
      addBorrowedAsset({
        symbol: token,
        amount: parseFloat(amount),
        value: parseFloat(amount), // Assuming 1:1 for simplicity
        apr: rate,
        paid: 0
      });
      
      alert(`Successfully borrowed ${amount} ${token}! Check your portfolio.`);
    }, 2000);
  };

  const calculateYearlyCost = (amount, rate) => {
    return amount * (rate / 100);
  };

  const calculateHealthFactor = () => {
    return collateralValue / (totalBorrowed * 1.5); // Simplified calculation
  };

  const healthFactor = calculateHealthFactor();
  const healthColor = healthFactor > 2 ? '#4ade80' : healthFactor > 1.5 ? '#f59e0b' : '#ef4444';

  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box className="glow-card" textAlign="center" p={4} mb={4}>
        <Typography variant="h3" className="electric-text" gutterBottom>
          🏦 Borrow Assets
        </Typography>
        <Typography variant="h6" sx={{ color: '#bfdbfe' }}>
          Borrow against your supplied collateral with competitive rates
        </Typography>
      </Box>

      {/* Health Factor Alert */}
      <Box className="glow-card" p={3} mb={4}>
        <Typography variant="h6" className="electric-text" gutterBottom>
          🛡️ Account Health
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                Health Factor: <span style={{ color: healthColor, fontWeight: 'bold' }}>
                  {healthFactor.toFixed(2)}
                </span>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(healthFactor * 50, 100)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#334155',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: healthColor,
                    borderRadius: 4
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              💰 Collateral: <strong>${collateralValue.toLocaleString()}</strong> | 
              📉 Borrowed: <strong>${totalBorrowed.toLocaleString()}</strong>
            </Typography>
          </Grid>
        </Grid>
        
        {healthFactor < 1.5 && (
          <Alert 
            severity="warning" 
            sx={{ 
              mt: 2,
              bgcolor: 'rgba(239, 68, 68, 0.1)', 
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}
          >
            ⚠️ Your account is at risk of liquidation. Consider repaying debt or adding collateral.
          </Alert>
        )}
      </Box>

      {/* Borrow Markets */}
      <Grid container spacing={3}>
        {tokens.map((token) => (
          <Grid item xs={12} md={4} key={token.symbol}>
            <Card 
              className="glow-card"
              sx={{ 
                height: '450px', // Fixed height for equal sizing
                display: 'flex',
                flexDirection: 'column',
                background: `linear-gradient(145deg, #1e293b, #334155)`,
                border: `1px solid ${token.color}30`,
                '&:hover': {
                  border: `1px solid ${token.color}60`,
                  boxShadow: `0 0 20px ${token.color}40`,
                  transform: 'translateY(-5px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Token Header */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box>
                    <Typography variant="h5" className="electric-text" gutterBottom>
                      {token.symbol}
                    </Typography>
              sx={{ 
                height: '100%',
                background: `linear-gradient(145deg, #1e293b, #334155)`,
                border: `1px solid ${token.color}30`,
                '&:hover': {
                  border: `1px solid ${token.color}60`,
                  boxShadow: `0 0 20px ${token.color}40`
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Token Header */}
                <Box display="flex" alignItems="center" justifyContent="between" mb={3}>
                  <Box>
                    <Typography variant="h5" className="electric-text" gutterBottom>
                      {token.symbol}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {token.name}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="h4" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                      {loading ? '...' : `${rates[token.symbol]?.toFixed(2)}%`}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      Borrow APR
                    </Typography>
                  </Box>
                </Box>

                {/* Borrow Form */}
                <Box>
                  <TextField
                    fullWidth
                    type="number"
                    label={`Amount (${token.symbol})`}
                    value={amounts[token.symbol] || ''}
                    onChange={(e) => setAmounts(prev => ({ 
                      ...prev, 
                      [token.symbol]: e.target.value 
                    }))}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        color: '#f8fafc',
                        '& fieldset': { borderColor: `${token.color}60` },
                        '&:hover fieldset': { borderColor: token.color },
                        '&.Mui-focused fieldset': { borderColor: token.color }
                      },
                      '& .MuiInputLabel-root': { 
                        color: '#94a3b8',
                        '&.Mui-focused': { color: token.color }
                      }
                    }}
                  />

                  {/* Cost Preview */}
                  {amounts[token.symbol] && !isNaN(amounts[token.symbol]) && (
                    <Box 
                      sx={{ 
                        bgcolor: 'rgba(239, 68, 68, 0.1)', 
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: 2, 
                        p: 2, 
                        mb: 2 
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#f87171' }}>
                        💸 Estimated yearly interest: 
                        <strong> {calculateYearlyCost(
                          parseFloat(amounts[token.symbol]), 
                          rates[token.symbol] || 0
                        ).toFixed(4)} {token.symbol}</strong>
                      </Typography>
                    </Box>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!amounts[token.symbol] || borrowing[token.symbol] || healthFactor < 1.2}
                    onClick={() => handleBorrow(token.symbol)}
                    sx={{
                      bgcolor: '#ef4444',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: '#dc2626',
                        boxShadow: '0 0 20px #ef444460'
                      },
                      '&:disabled': {
                        bgcolor: '#475569',
                        color: '#94a3b8'
                      }
                    }}
                  >
                    {borrowing[token.symbol] ? (
                      '⏳ Borrowing...'
                    ) : healthFactor < 1.2 ? (
                      <>
                        <WarningIcon sx={{ mr: 1 }} />
                        Insufficient Collateral
                      </>
                    ) : (
                      <>
                        <TrendingDownIcon sx={{ mr: 1 }} />
                        Borrow {token.symbol}
                      </>
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How Borrowing Works */}
      <Box className="glow-card" mt={6} p={4}>
        <Typography variant="h5" className="electric-text" gutterBottom>
          🎯 How Borrowing Works
        </Typography>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <SecurityIcon sx={{ fontSize: 48, color: '#4ade80', mb: 1 }} />
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 1 }}>
                1. Supply Collateral
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                First, supply assets as collateral to secure your loans
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <TrendingDownIcon sx={{ fontSize: 48, color: '#ef4444', mb: 1 }} />
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 1 }}>
                2. Borrow Assets
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Borrow up to 75% of your collateral value at competitive rates
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <WarningIcon sx={{ fontSize: 48, color: '#f59e0b', mb: 1 }} />
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 1 }}>
                3. Manage Risk
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Monitor your health factor to avoid liquidation
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Alert 
          severity="info" 
          sx={{ 
            mt: 3,
            bgcolor: 'rgba(59, 130, 246, 0.1)', 
            color: '#93c5fd',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}
        >
          💡 <strong>Liquidation Risk:</strong> If your health factor drops below 1.0, your collateral may be liquidated to repay your debt. Always maintain a healthy collateral ratio.
        </Alert>
      </Box>
    </Box>
  );
}
