// src/components/TokenSelector.jsx
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function TokenSelector({ onTokenChange }) {
  const [token, setToken] = useState('DAI');
  const [supplyRate, setSupplyRate] = useState('--');

  useEffect(() => {
    const fetchRate = async () => {
      const { getSupplyRate } = require('../utils/compound');
      const rate = await getSupplyRate(token);
      setSupplyRate(rate);
    };
    fetchRate();
  }, [token]);

  const handleChange = (e) => {
    const newToken = e.target.value;
    setToken(newToken);
    onTokenChange(newToken, supplyRate);
  };

  return (
    <FormControl fullWidth size="small" className="glow-card" sx={{ padding: '0.5rem' }}>
      <InputLabel id="token-select-label" className="electric-text">Token</InputLabel>
      <Select
        labelId="token-select-label"
        value={token}
        label="Token"
        onChange={handleChange}
        sx={{
          backgroundColor: '#1e293b',
          color: '#93c5fd',
          borderRadius: 2,
        }}
      >
        <MenuItem value="DAI">DAI</MenuItem>
        <MenuItem value="USDC">USDC</MenuItem>
        <MenuItem value="ETH">ETH</MenuItem>
      </Select>
      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#bfdbfe' }}>
        Supply Rate: {supplyRate}
      </p>
    </FormControl>
  );
}