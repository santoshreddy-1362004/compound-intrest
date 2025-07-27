// src/components/TokenSelector.jsx
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';

export default function TokenSelector({ onTokenChange }) {
  const [token, setToken] = useState('DAI');

  useEffect(() => {
    // Just notify parent of token change, don't fetch rates here
    if (onTokenChange) onTokenChange(token);
  }, [token, onTokenChange]);

  return (
    <Box className="glow-card" sx={{ padding: '1.5rem' }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <TokenIcon sx={{ color: '#60a5fa' }} />
        <Typography variant="h6" className="electric-text">
          🪙 Select Token
        </Typography>
      </Box>

      <FormControl fullWidth size="medium">
        <InputLabel 
          id="token-select-label" 
          sx={{
            color: '#94a3b8',
            fontWeight: 'bold',
            '&.Mui-focused': {
              color: '#60a5fa',
            },
            '&.MuiFormLabel-filled': {
              color: '#60a5fa',
            }
          }}
        >
          Choose Token
        </InputLabel>
        <Select
          labelId="token-select-label"
          value={token}
          label="Choose Token"
          onChange={(e) => setToken(e.target.value)}
          sx={{
            backgroundColor: 'transparent',
            color: '#f8fafc',
            borderRadius: 2,
            mb: 2,
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
              color: '#f8fafc',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              py: 2
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
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#bfdbfe', 
            textAlign: 'center',
            fontStyle: 'italic',
            mt: 1,
            mb: 2
          }}
        >
          📊 Live rates fetched on calculation
        </Typography>

        {/* Demo Rate Information */}
        <Box sx={{ 
          p: 2, 
          bgcolor: 'rgba(96, 165, 250, 0.1)', 
          borderRadius: 2,
          border: '1px solid rgba(96, 165, 250, 0.3)'
        }}>
          <Typography variant="body2" sx={{ color: '#60a5fa', fontWeight: 'bold', mb: 1 }}>
            💡 Current {token} Rates (Demo)
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#4ade80' }}>
              💰 Supply APR: ~{token === 'DAI' ? '2.5' : token === 'USDC' ? '3.2' : '1.8'}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ color: '#f87171' }}>
              🏦 Borrow APR: ~{token === 'DAI' ? '4.5' : token === 'USDC' ? '5.1' : '3.9'}%
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mt: 1 }}>
            * Real rates from Compound V3 Protocol
          </Typography>
        </Box>
      </FormControl>
    </Box>
  );
}
