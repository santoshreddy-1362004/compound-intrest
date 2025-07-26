// src/pages/About.jsx
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box className="glow-card electric-text" textAlign="center" p={4} mb={4}>
        <Typography variant="h4" gutterBottom>📘 About Compound DeFi Platform</Typography>
        <Typography variant="body1">
          A comprehensive DeFi platform for lending, borrowing, and calculating compound interest on the Compound Protocol.
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
          <Typography variant="h5" className="electric-text" gutterBottom>What Does This Platform Do?</Typography>
          <Typography paragraph>
            Our Compound DeFi Platform is a comprehensive suite of tools that allows users to:
          </Typography>
          <Typography paragraph>
            <strong>🔢 Calculate Interest:</strong> Estimate returns and costs using real Compound rates
            <br />
            <strong>💰 Lend Assets:</strong> Supply crypto assets to earn competitive interest rates
            <br />
            <strong>🏦 Borrow Assets:</strong> Borrow against your collateral with transparent pricing
            <br />
            <strong>📊 Track Portfolio:</strong> Monitor all positions, health factors, and performance
          </Typography>
          <Typography paragraph>
            The platform integrates with Compound V3 to provide real-time rates and simulate DeFi interactions in a beautiful, user-friendly interface.
          </Typography>
        </Grid>
      </Grid>

      {/* Benefits Section */}
      <Box className="glow-card" p={4} mb={4}>
        <Typography variant="h5" className="electric-text" gutterBottom>💡 Why This Platform Matters in DeFi</Typography>
        <Typography paragraph>
          This comprehensive DeFi platform bridges the gap between complex protocols and user-friendly interfaces. 
          It empowers both beginners and advanced users to:
        </Typography>
        <Typography paragraph>
          ✅ <strong>Make Informed Decisions:</strong> Access real-time rates and risk metrics before transacting
          <br />
          ✅ <strong>Manage Risk Effectively:</strong> Monitor health factors and liquidation risks in real-time  
          <br />
          ✅ <strong>Optimize Returns:</strong> Compare rates across different assets and strategies
          <br />
          ✅ <strong>Learn DeFi Safely:</strong> Understand lending and borrowing mechanics through simulation
        </Typography>
        <Typography paragraph>
          With beautiful visualizations, comprehensive portfolio tracking, and seamless UX, this platform makes DeFi accessible to everyone while maintaining the sophisticated features power users need.
        </Typography>
      </Box>
    </Box>
  );
}