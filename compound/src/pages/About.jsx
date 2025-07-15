// src/pages/About.jsx
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box className="glow-card electric-text" textAlign="center" p={4} mb={4}>
        <Typography variant="h4" gutterBottom>📘 About This Tool</Typography>
        <Typography variant="body1">
          A powerful interest calculator built on top of the Compound Protocol.
        </Typography>
      </Box>

      {/* Intro Section */}
      <Grid container spacing={4} alignItems="center" mb={6}>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="electric-text" gutterBottom>What is Compound?</Typography>
          <Typography paragraph>
            Compound is a decentralized finance protocol that allows users to supply and borrow assets without intermediaries. It uses an algorithmic system to adjust interest rates based on supply and demand .
          </Typography>
          <Typography paragraph>
            Users earn interest by supplying assets like DAI, USDC, or ETH, and can borrow other assets by posting collateral.
          </Typography>
        </Grid>
      </Grid>

      {/* Calculator Explanation */}
      <Grid container spacing={4} alignItems="center" mb={6} direction={{ xs: 'column', md: 'row-reverse' }}>
        <Grid item xs={12} md={6}>
          <img
            src="/calculator-illustration.png"
            alt="Interest Calculator"
            style={{ width: '100%', borderRadius: '12px' }}
            loading="lazy"
            decoding="async"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="electric-text" gutterBottom>What Does This Calculator Do?</Typography>
          <Typography paragraph>
            Our Compound Interest Calculator helps users estimate how much they will earn by supplying assets to Compound or how much they will pay if they borrow.
          </Typography>
          <Typography paragraph>
            You simply enter:
            <ul>
              <li>The token (DAI, USDC, ETH)</li>
              <li>Amount you plan to supply/borrow</li>
              <li>Time period (in days)</li>
            </ul>
            The tool then calculates daily, weekly, and monthly returns using real-time Compound rates.
          </Typography>
        </Grid>
      </Grid>

      {/* Benefits Section */}
      <Box className="glow-card" p={4} mb={4}>
        <Typography variant="h5" className="electric-text" gutterBottom>💡 Why This Matters in DeFi</Typography>
        <Typography paragraph>
          Understanding yield opportunities and borrowing costs is critical in DeFi. Our tool makes it easy for both beginners and advanced users to explore potential outcomes before interacting with the actual Compound protocol.
        </Typography>
        <Typography paragraph>
          With real-time data, beautiful visualizations, and a futuristic design, this calculator enhances accessibility and financial literacy in the DeFi ecosystem.
        </Typography>
      </Box>
    </Box>
  );
}