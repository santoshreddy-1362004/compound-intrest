// src/pages/Lending.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, Card, CardContent, Alert } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getSupplyRate } from '../utils/compound';
import { usePortfolio } from '../context/PortfolioContext';
import Footer from '../components/Footer';

const tokens = [
  { symbol: 'DAI', name: 'Dai Stablecoin', color: '#f59e0b' },
  { symbol: 'USDC', name: 'USD Coin', color: '#3b82f6' },
  { symbol: 'ETH', name: 'Ethereum', color: '#8b5cf6' }
];

export default function Lending() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [amounts, setAmounts] = useState({});
  const [supplying, setSupplying] = useState({});
  const { addSuppliedAsset } = usePortfolio();

  useEffect(() => {
    const fetchRates = async () => {
      const newRates = {};
      for (const token of tokens) {
        try {
          const rate = await getSupplyRate(token.symbol);
          newRates[token.symbol] = rate;
        } catch (error) {
          console.error(`Failed to fetch rate for ${token.symbol}:`, error);
          newRates[token.symbol] = 0;
        }
      }
      setRates(newRates);
      setLoading(false);
    };

    fetchRates();
  }, []);

  const handleSupply = async (token) => {
    const amount = amounts[token];
    if (!amount || amount <= 0) return;

    setSupplying(prev => ({ ...prev, [token]: true }));
    
    // Simulate transaction
    setTimeout(() => {
      setSupplying(prev => ({ ...prev, [token]: false }));
      setAmounts(prev => ({ ...prev, [token]: '' }));
      
      // Add to portfolio
      const rate = rates[token] || 2.5;
      addSuppliedAsset({
        symbol: token,
        amount: parseFloat(amount),
        value: parseFloat(amount), // Assuming 1:1 for simplicity
        apy: rate,
        earned: 0
      });
      
      alert(`Successfully supplied ${amount} ${token}! Check your portfolio.`);
    }, 2000);
  };

  const calculateYearlyEarnings = (amount, rate) => {
    return amount * (rate / 100);
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box className="glow-card" textAlign="center" p={4} mb={4}>
        <Typography variant="h3" className="electric-text" gutterBottom>
          💰 Supply & Earn
        </Typography>
        <Typography variant="h6" sx={{ color: '#bfdbfe' }}>
          Supply your crypto assets to Compound and start earning interest instantly
        </Typography>
      </Box>

      {/* Info Alert */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 4, 
          bgcolor: 'rgba(59, 130, 246, 0.1)', 
          color: '#93c5fd',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}
      >
        <Typography variant="body2">
          🔒 Your supplied assets earn interest every block and can be withdrawn anytime. 
          They also serve as collateral for borrowing other assets.
        </Typography>
      </Alert>

      {/* Supply Markets */}
      <Grid container spacing={3}>
        {tokens.map((token) => (
          <Grid item xs={12} md={4} key={token.symbol}>
            <Card 
              className="glow-card"
              sx={{ 
                height: '420px', // Fixed height for equal sizing
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
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {token.name}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="h4" sx={{ color: token.color, fontWeight: 'bold' }}>
                      {loading ? '...' : `${rates[token.symbol]?.toFixed(2)}%`}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      Supply APY
                    </Typography>
                  </Box>
                </Box>

                {/* Supply Form - Fixed spacing */}
                <Box sx={{ mt: 'auto' }}> {/* Push to bottom */}
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
                      mb: 3,
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

                  {/* Earnings Preview - Fixed height */}
                  <Box 
                    sx={{ 
                      bgcolor: 'rgba(34, 197, 94, 0.1)', 
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: 2, 
                      p: 2, 
                      mb: 3,
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {amounts[token.symbol] && !isNaN(amounts[token.symbol]) ? (
                      <Typography variant="body2" sx={{ color: '#4ade80' }}>
                        💡 Estimated yearly earnings: 
                        <strong> ${calculateYearlyEarnings(
                          parseFloat(amounts[token.symbol]), 
                          rates[token.symbol] || 0
                        ).toFixed(2)}</strong>
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        💡 Enter amount to see projected earnings
                      </Typography>
                    )}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!amounts[token.symbol] || supplying[token.symbol]}
                    onClick={() => handleSupply(token.symbol)}
                    sx={{
                      bgcolor: token.color,
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: '1rem',
                      '&:hover': {
                        bgcolor: token.color,
                        filter: 'brightness(1.1)',
                        boxShadow: `0 0 20px ${token.color}60`,
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        bgcolor: '#475569',
                        color: '#94a3b8'
                      }
                    }}
                  >
                    {supplying[token.symbol] ? (
                      '⏳ Supplying...'
                    ) : (
                      <>
                        <TrendingUpIcon sx={{ mr: 1 }} />
                        Supply {token.symbol}
                      </>
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How It Works */}
      <Box className="glow-card" mt={6} p={4}>
        <Typography variant="h5" className="electric-text" gutterBottom>
          🎯 How Lending Works
        </Typography>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <AccountBalanceWalletIcon sx={{ fontSize: 48, color: '#4ade80', mb: 1 }} />
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 1 }}>
                1. Supply Assets
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Deposit your crypto assets into the Compound protocol
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <TrendingUpIcon sx={{ fontSize: 48, color: '#3b82f6', mb: 1 }} />
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 1 }}>
                2. Earn Interest
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Start earning interest automatically with every block
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Box sx={{ fontSize: 48, color: '#f59e0b', mb: 1 }}>🔄</Box>
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 1 }}>
                3. Withdraw Anytime
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Withdraw your assets plus earned interest whenever you want
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
