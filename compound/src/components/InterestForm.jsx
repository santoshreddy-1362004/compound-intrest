// src/components/InterestForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function InterestForm({ token, onCalculate }) {
  const [amount, setAmount] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && days) {
      onCalculate({ amount, days });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="glow-card">
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
            '& fieldset': {
              borderColor: '#93c5fd',
            },
            '&:hover fieldset': {
              borderColor: '#60a5fa',
            },
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
            '& fieldset': {
              borderColor: '#93c5fd',
            },
            '&:hover fieldset': {
              borderColor: '#60a5fa',
            },
          },
        }}
      />

      {/* Animated Rainbow Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="rainbow-button"
        sx={{
          mt: 3,
          mb: 2,
          fontWeight: 'bold',
          borderRadius: 2,
          padding: '0.6rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        🌈 Calculate Yield
      </Button>
    </Box>
  );
}