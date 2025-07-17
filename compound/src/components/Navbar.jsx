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
  Interest Calculator
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
            Home
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

          <Button
            onClick={() => setPage('resources')}
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
            Resources
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}