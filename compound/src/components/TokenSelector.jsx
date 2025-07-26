// src/components/TokenSelector.jsx
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function TokenSelector({ onTokenChange }) {
  const [token, setToken] = useState('DAI');

  useEffect(() => {
    // Just notify parent of token change, don't fetch rates here
    if (onTokenChange) onTokenChange(token);
  }, [token, onTokenChange]);

  return (
    <FormControl fullWidth size="small" className="glow-card" sx={{ padding: '1rem' }}>
      <InputLabel 
        id="token-select-label" 
        sx={{
          color: '#ffffff',
          fontWeight: 'bold',
          '&.Mui-focused': {
            color: '#ffffff',
          },
          '&.MuiFormLabel-filled': {
            color: '#ffffff',
          }
        }}
      >
        Select Token
      </InputLabel>
      <Select
        labelId="token-select-label"
        value={token}
        label="Select Token"
        onChange={(e) => setToken(e.target.value)}
        sx={{
          backgroundColor: '#1e293b',
          color: '#ffffff',
          borderRadius: 2,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#93c5fd',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60a5fa',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60a5fa',
          },
          '& .MuiSelect-select': {
            color: '#ffffff',
            fontWeight: 'bold',
          },
          '& .MuiSvgIcon-root': {
            color: '#93c5fd',
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: '#1e293b',
              border: '1px solid #93c5fd',
              '& .MuiMenuItem-root': {
                color: '#e2e8f0',
                '&:hover': {
                  backgroundColor: 'rgba(147, 197, 253, 0.1)',
                  color: '#ffffff',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(147, 197, 253, 0.2)',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(147, 197, 253, 0.3)',
                  }
                }
              }
            }
          }
        }}
      >
        <MenuItem value="DAI">DAI - Dai Stablecoin</MenuItem>
        <MenuItem value="USDC">USDC - USD Coin</MenuItem>
        <MenuItem value="ETH">ETH - Ethereum</MenuItem>
      </Select>
      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#bfdbfe', textAlign: 'center' }}>
        📊 Live rates fetched on calculation
      </p>
    </FormControl>
  );
}