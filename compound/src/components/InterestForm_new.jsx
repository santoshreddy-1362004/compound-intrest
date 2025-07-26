// src/components/InterestForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

export default function InterestForm({ token, onCalculate, loading = false, calculationType = 'lending' }) {
  const [amount, setAmount] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && days) {
      onCalculate({ amount, days });
    }
  };

  const getTitle = () => {
    return calculationType === 'lending' 
      ? '💰 Calculate Your Earnings' 
      : '🏦 Calculate Your Interest Cost';
  };

  const getAmountLabel = () => {
    return calculationType === 'lending' 
      ? 'Amount to Lend' 
      : 'Amount to Borrow';
  };

  const getButtonText = () => {
    return calculationType === 'lending' 
      ? 'Calculate Earnings' 
      : 'Calculate Interest Cost';
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      className="glow-card"
      sx={{ padding: '1.5rem' }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <CalculateIcon sx={{ color: '#60a5fa' }} />
        <Typography variant="h6" className="electric-text">
          {getTitle()}
        </Typography>
      </Box>

      <TextField
        fullWidth
        type="number"
        label={getAmountLabel()}
        placeholder="Enter amount (e.g., 1000)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            color: '#f8fafc',
            '& fieldset': { borderColor: '#93c5fd' },
            '&:hover fieldset': { borderColor: '#60a5fa' },
            '&.Mui-focused fieldset': { borderColor: '#60a5fa' }
          },
          '& .MuiInputLabel-root': { 
            color: '#94a3b8',
            '&.Mui-focused': { color: '#60a5fa' }
          }
        }}
      />

      <TextField
        fullWidth
        type="number"
        label="Days"
        placeholder="Enter days (e.g., 365)"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            color: '#f8fafc',
            '& fieldset': { borderColor: '#93c5fd' },
            '&:hover fieldset': { borderColor: '#60a5fa' },
            '&.Mui-focused fieldset': { borderColor: '#60a5fa' }
          },
          '& .MuiInputLabel-root': { 
            color: '#94a3b8',
            '&.Mui-focused': { color: '#60a5fa' }
          }
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading || !amount || !days}
        sx={{
          fontWeight: 'bold',
          borderRadius: 2,
          padding: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '1.1rem',
          background: calculationType === 'lending' 
            ? 'linear-gradient(135deg, #4ade80, #22c55e)' 
            : 'linear-gradient(135deg, #f87171, #ef4444)',
          '&:hover': {
            background: calculationType === 'lending'
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : 'linear-gradient(135deg, #ef4444, #dc2626)',
            transform: 'translateY(-2px)',
            boxShadow: calculationType === 'lending'
              ? '0 10px 20px rgba(34, 197, 94, 0.4)'
              : '0 10px 20px rgba(239, 68, 68, 0.4)'
          },
          '&:disabled': {
            background: '#4b5563',
            color: '#9ca3af'
          }
        }}
      >
        {loading ? '⏳ Fetching Live Rates...' : getButtonText()}
      </Button>
    </Box>
  );
}
