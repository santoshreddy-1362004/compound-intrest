// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import compoundLogo from '../assets/compound-logo.png'; // add your Compound logo here

export default function Navbar({ setPage }) {
  return (
    <AppBar position="static" sx={{ bgcolor: 'rgba(30, 41, 59, 0.9)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={compoundLogo} alt="Compound Logo" style={{ height: '28px' }} />
         <Typography
  variant="h6"
  component="div"
  sx={{
    color: '#f1f5f9',
    fontWeight: 600,
    letterSpacing: '0.5px'
  }}
>
  DeFi Platform
</Typography>
        </Box>

        <Box flexGrow={1} />

        {/* Glowing Navbar Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={() => setPage('home')}
            sx={{
              color: '#93c5fd',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              paddingX: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(147, 197, 255, 0.1)',
                boxShadow: '0 0 10px rgba(147, 197, 255, 0.6)',
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            Calculator
          </Button>

          <Button
            onClick={() => setPage('lending')}
            sx={{
              color: '#93c5fd',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              paddingX: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(34, 197, 94, 0.1)',
                boxShadow: '0 0 10px rgba(34, 197, 94, 0.6)',
                transform: 'scale(1.05)',
                color: '#4ade80',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            💰 Lend
          </Button>

          <Button
            onClick={() => setPage('borrowing')}
            sx={{
              color: '#93c5fd',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              paddingX: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
                transform: 'scale(1.05)',
                color: '#f87171',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            🏦 Borrow
          </Button>

          <Button
            onClick={() => setPage('portfolio')}
            sx={{
              color: '#93c5fd',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              paddingX: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(168, 85, 247, 0.1)',
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
                transform: 'scale(1.05)',
                color: '#c084fc',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            📊 Portfolio
          </Button>

          <Button
            onClick={() => setPage('about')}
            sx={{
              color: '#93c5fd',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              paddingX: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(147, 197, 255, 0.1)',
                boxShadow: '0 0 10px rgba(147, 197, 255, 0.6)',
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}