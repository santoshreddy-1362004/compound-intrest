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
      <InputLabel id="token-select-label" className="electric-text">
        Select Token
      </InputLabel>
      <Select
        labelId="token-select-label"
        value={token}
        label="Select Token"
        onChange={(e) => setToken(e.target.value)}
        sx={{
          backgroundColor: '#1e293b',
          color: '#93c5fd',
          borderRadius: 2,
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