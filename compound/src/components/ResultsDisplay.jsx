// src/components/ResultsDisplay.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function ResultsDisplay({ result }) {
  if (!result) return null;

  const { amount, days, finalBalance, token, apr } = result;

  return (
    <Box className="glow-card" sx={{ padding: '1.5rem' }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <TrendingUpIcon sx={{ color: '#60a5fa' }} />
        <Typography variant="h6" className="electric-text">
          📈 Yield Forecast ({token})
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <Box>
          <Typography variant="body2" sx={{ color: '#93c5fd' }}>
            Initial Amount
          </Typography>
          <Typography variant="h6" sx={{ color: '#bfdbfe', fontWeight: 500 }}>
            {amount} {token}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ color: '#93c5fd' }}>
            Time Period
          </Typography>
          <Typography variant="h6" sx={{ color: '#bfdbfe', fontWeight: 500 }}>
            {days} days
          </Typography>
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="body2" sx={{ color: '#93c5fd' }}>
          Final Balance
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#f8fafc',
          }}
        >
          ${parseFloat(finalBalance).toFixed(2)} {token}
        </Typography>
      </Box>

      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" sx={{ color: '#93c5fd' }}>
          Est. APR
        </Typography>
        <Typography variant="body2" sx={{ color: '#60a5fa' }}>
          {apr}
        </Typography>
      </Box>
    </Box>
  );
}