// src/components/ThemeToggle.jsx
import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ sx = {} }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: darkMode ? '#93c5fd' : '#3b82f6',
          bgcolor: darkMode ? 'rgba(147, 197, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)',
          border: darkMode ? '1px solid rgba(147, 197, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: 2,
          p: 1.5,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: darkMode ? 'rgba(147, 197, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)',
            transform: 'scale(1.05)',
            boxShadow: darkMode 
              ? '0 0 20px rgba(147, 197, 255, 0.3)' 
              : '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          ...sx
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontSize: darkMode ? 24 : 20
        }}>
          {darkMode ? (
            <>
              <Brightness7 sx={{ fontSize: 'inherit' }} />
              <Box component="span" sx={{ 
                fontSize: '0.75rem', 
                fontWeight: 'bold',
                color: 'inherit',
                display: { xs: 'none', sm: 'inline' }
              }}>
                Light
              </Box>
            </>
          ) : (
            <>
              <Brightness4 sx={{ fontSize: 'inherit' }} />
              <Box component="span" sx={{ 
                fontSize: '0.75rem', 
                fontWeight: 'bold',
                color: 'inherit',
                display: { xs: 'none', sm: 'inline' }
              }}>
                Dark
              </Box>
            </>
          )}
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
