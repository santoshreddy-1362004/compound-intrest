// src/components/InterestForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useTheme } from '../context/ThemeContext';

export default function InterestForm({ token, onCalculate, loading = false, calculationType = 'lending' }) {
  const [amount, setAmount] = useState('');
  const [days, setDays] = useState('');
  const { darkMode } = useTheme();

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
            color: darkMode ? '#f8fafc' : '#1e293b',
            backgroundColor: darkMode ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
            '& fieldset': { 
              borderColor: darkMode ? '#93c5fd' : '#3b82f6' 
            },
            '&:hover fieldset': { 
              borderColor: darkMode ? '#60a5fa' : '#2563eb' 
            },
            '&.Mui-focused fieldset': { 
              borderColor: darkMode ? '#60a5fa' : '#2563eb' 
            }
          },
          '& .MuiInputLabel-root': { 
            color: darkMode ? '#94a3b8' : '#64748b',
            '&.Mui-focused': { 
              color: darkMode ? '#60a5fa' : '#2563eb' 
            }
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: darkMode ? '#64748b' : '#94a3b8',
            opacity: 1
          }
        }}
      />

      {/* Quick Amount Buttons */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}>
          Quick Amount Selection:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['1000', '5000', '10000', '25000'].map((quickAmount) => (
            <Box
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              sx={{
                cursor: 'pointer',
                px: 2,
                py: 0.5,
                border: darkMode ? '1px solid #93c5fd' : '1px solid #3b82f6',
                borderRadius: 1,
                bgcolor: amount === quickAmount 
                  ? (darkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)')
                  : 'transparent',
                color: amount === quickAmount 
                  ? (darkMode ? '#60a5fa' : '#2563eb')
                  : (darkMode ? '#94a3b8' : '#64748b'),
                fontSize: '0.8rem',
                '&:hover': {
                  bgcolor: darkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  color: darkMode ? '#60a5fa' : '#2563eb'
                },
                transition: 'all 0.2s ease'
              }}
            >
              ${quickAmount}
            </Box>
          ))}
        </Box>
      </Box>

      <TextField
        fullWidth
        type="number"
        label="Days"
        placeholder="Enter days (e.g., 365)"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            color: darkMode ? '#f8fafc' : '#1e293b',
            backgroundColor: darkMode ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
            '& fieldset': { 
              borderColor: darkMode ? '#93c5fd' : '#3b82f6' 
            },
            '&:hover fieldset': { 
              borderColor: darkMode ? '#60a5fa' : '#2563eb' 
            },
            '&.Mui-focused fieldset': { 
              borderColor: darkMode ? '#60a5fa' : '#2563eb' 
            }
          },
          '& .MuiInputLabel-root': { 
            color: darkMode ? '#94a3b8' : '#64748b',
            '&.Mui-focused': { 
              color: darkMode ? '#60a5fa' : '#2563eb' 
            }
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: darkMode ? '#64748b' : '#94a3b8',
            opacity: 1
          }
        }}
      />

      {/* Quick Days Buttons */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b', mb: 1 }}>
          Quick Time Period:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[
            { days: '30', label: '1 Month' },
            { days: '90', label: '3 Months' },
            { days: '180', label: '6 Months' },
            { days: '365', label: '1 Year' }
          ].map(({ days: quickDays, label }) => (
            <Box
              key={quickDays}
              onClick={() => setDays(quickDays)}
              sx={{
                cursor: 'pointer',
                px: 2,
                py: 0.5,
                border: darkMode ? '1px solid #93c5fd' : '1px solid #3b82f6',
                borderRadius: 1,
                bgcolor: days === quickDays 
                  ? (darkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)')
                  : 'transparent',
                color: days === quickDays 
                  ? (darkMode ? '#60a5fa' : '#2563eb')
                  : (darkMode ? '#94a3b8' : '#64748b'),
                fontSize: '0.8rem',
                '&:hover': {
                  bgcolor: darkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  color: darkMode ? '#60a5fa' : '#2563eb'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </Box>

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
