// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f1f5f9', mt: 4 }}>
      <Typography variant="body2">© 2025 Compound Connect Hackathon | Your Name</Typography>
    </Box>
  );
}