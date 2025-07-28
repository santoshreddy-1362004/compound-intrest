// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        px: 2,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        borderTop: '1px solid rgba(147, 197, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center'
      }}
    >
      {/* Links */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2, 
        justifyContent: 'center',
        mb: 1.5
      }}>
        <Link
          href="https://compound.finance"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#60a5fa',
            textDecoration: 'none',
            fontSize: '0.8rem',
            '&:hover': { color: '#3b82f6', textDecoration: 'underline' }
          }}
        >
          🏦 Compound
        </Link>
        <Link
          href="https://docs.compound.finance"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#60a5fa',
            textDecoration: 'none',
            fontSize: '0.8rem',
            '&:hover': { color: '#3b82f6', textDecoration: 'underline' }
          }}
        >
          📚 Docs
        </Link>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#60a5fa',
            textDecoration: 'none',
            fontSize: '0.8rem',
            '&:hover': { color: '#3b82f6', textDecoration: 'underline' }
          }}
        >
          💻 GitHub
        </Link>
      </Box>

      {/* Copyright */}
      <Typography 
        variant="caption" 
        sx={{ 
          color: '#64748b',
          fontSize: '0.75rem'
        }}
      >
        © 2025 DeFi Interest Calculator • MIT Licensed • Educational use only
      </Typography>
    </Box>
  );
}