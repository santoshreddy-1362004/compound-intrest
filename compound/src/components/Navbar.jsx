// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import compoundLogo from '../assets/compound-logo.png'; // add your Compound logo here
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ setPage }) {
  const { darkMode } = useTheme();
  
  const navbarBg = darkMode 
    ? 'rgba(30, 41, 59, 0.9)' 
    : 'rgba(255, 255, 255, 0.9)';
    
  const textColor = darkMode ? '#f1f5f9' : '#1e293b';
  const linkColor = darkMode ? '#93c5fd' : '#3b82f6';

  return (
    <AppBar position="static" sx={{ 
      bgcolor: navbarBg, 
      backdropFilter: 'blur(10px)',
      borderBottom: darkMode ? 'none' : '1px solid rgba(226, 232, 240, 0.8)'
    }}>
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={compoundLogo} alt="Compound Logo" style={{ height: '28px' }} />
         <Typography
  variant="h6"
  component="div"
  sx={{
    color: textColor,
    fontWeight: 600,
    letterSpacing: '0.5px'
  }}
>
  Compound DeFi Platform
</Typography>
        </Box>

        <Box flexGrow={1} />

        {/* Glowing Navbar Links */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            onClick={() => setPage('home')}
            sx={{
              color: linkColor,
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              paddingX: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: darkMode ? 'rgba(147, 197, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                boxShadow: `0 0 10px ${darkMode ? 'rgba(147, 197, 255, 0.6)' : 'rgba(59, 130, 246, 0.6)'}`,
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
              color: linkColor,
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
              color: linkColor,
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
              color: linkColor,
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
              color: linkColor,
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              paddingX: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: darkMode ? 'rgba(147, 197, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                boxShadow: `0 0 10px ${darkMode ? 'rgba(147, 197, 255, 0.6)' : 'rgba(59, 130, 246, 0.6)'}`,
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
              color: linkColor,
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              paddingX: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(251, 191, 36, 0.1)',
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.6)',
                transform: 'scale(1.05)',
                color: '#fbbf24',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            🔗 Resources
          </Button>
          
          {/* Theme Toggle Button */}
          <ThemeToggle sx={{ ml: 2 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}