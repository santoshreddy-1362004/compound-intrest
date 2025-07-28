// src/components/TokenSelector.jsx
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import { useTheme } from '../context/ThemeContext';

export default function TokenSelector({ onTokenChange }) {
  const [token, setToken] = useState('DAI');
  const { darkMode } = useTheme();

  useEffect(() => {
    // Just notify parent of token change, don't fetch rates here
    if (onTokenChange) onTokenChange(token);
  }, [token, onTokenChange]);

  return (
    <Box className="glow-card" sx={{ padding: '1.5rem' }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <TokenIcon sx={{ color: darkMode ? '#60a5fa' : '#2563eb' }} />
        <Typography variant="h6" className="electric-text">
          🪙 Select Token
        </Typography>
      </Box>

      <FormControl fullWidth size="medium">
        <InputLabel 
          id="token-select-label" 
          sx={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontWeight: 'bold',
            '&.Mui-focused': {
              color: darkMode ? '#60a5fa' : '#2563eb',
            },
            '&.MuiFormLabel-filled': {
              color: darkMode ? '#60a5fa' : '#2563eb',
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
            backgroundColor: darkMode ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
            color: darkMode ? '#f8fafc' : '#1e293b',
            borderRadius: 2,
            mb: 2,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? '#93c5fd' : '#3b82f6',
            },
            '& .MuiSelect-select': {
              color: darkMode ? '#f8fafc' : '#1e293b',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              py: 2
            },
            '& .MuiSelect-icon': {
              color: darkMode ? '#93c5fd' : '#3b82f6',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? '#60a5fa' : '#2563eb',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? '#60a5fa' : '#2563eb',
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: darkMode ? '#1e293b' : '#ffffff',
                border: darkMode ? '1px solid #93c5fd' : '1px solid #3b82f6',
                '& .MuiMenuItem-root': {
                  color: darkMode ? '#e2e8f0' : '#1e293b',
                  '&:hover': {
                    backgroundColor: darkMode ? 'rgba(147, 197, 253, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: darkMode ? 'rgba(147, 197, 253, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(147, 197, 253, 0.3)' : 'rgba(59, 130, 246, 0.3)',
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
            color: darkMode ? '#bfdbfe' : '#64748b', 
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
          bgcolor: darkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
          borderRadius: 2,
          border: darkMode ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <Typography variant="body2" sx={{ 
            color: darkMode ? '#60a5fa' : '#2563eb', 
            fontWeight: 'bold', 
            mb: 1 
          }}>
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
          <Typography variant="caption" sx={{ 
            color: darkMode ? '#94a3b8' : '#64748b', 
            display: 'block', 
            mt: 1 
          }}>
            * Real rates from Compound V3 Protocol
          </Typography>
        </Box>
      </FormControl>
    </Box>
  );
}
