// src/components/InterestForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

export default function InterestForm({ token, onCalculate, loading = false }) {
  const [amount, setAmount] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && days) {
      // Pass amount and days - token is already in parent state
      onCalculate({ amount, days });
    }
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
          💰 Calculate Your Yield
        </Typography>
      </Box>

      <TextField
        margin="normal"
        required
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        InputProps={{ style: { color: '#93c5fd' } }}
        InputLabelProps={{ style: { color: '#93c5fd' } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderColor: '#93c5fd',
            '& fieldset': { borderColor: '#93c5fd' },
            '&:hover fieldset': { borderColor: '#60a5fa' },
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Days"
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        InputProps={{ style: { color: '#93c5fd' } }}
        InputLabelProps={{ style: { color: '#93c5fd' } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderColor: '#93c5fd',
            '& fieldset': { borderColor: '#93c5fd' },
            '&:hover fieldset': { borderColor: '#60a5fa' },
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        className="rainbow-button"
        sx={{
          mt: 3,
          mb: 1,
          fontWeight: 'bold',
          borderRadius: 2,
          padding: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '1.1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {loading ? '⏳ Fetching Live Rates...' : '🚀 Calculate Yield'}
      </Button>
    </Box>
  );
}