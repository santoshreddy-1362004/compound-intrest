// src/pages/About.jsx
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function About() {
  const features = [
    {
      icon: <CalculateIcon sx={{ fontSize: 48, color: '#93c5fd' }} />,
      title: 'Interest Calculator',
      description: 'Calculate real-time lending and borrowing costs using live Compound Protocol rates. Toggle between lending earnings and borrowing costs.',
      color: '#93c5fd'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: '#4ade80' }} />,
      title: 'Supply & Earn',
      description: 'Supply DAI, USDC, or ETH to earn competitive interest rates. Your assets serve as collateral and earn compound interest every block.',
      color: '#4ade80'
    },
    {
      icon: <TrendingDownIcon sx={{ fontSize: 48, color: '#f87171' }} />,
      title: 'Borrow Assets',
      description: 'Borrow against your supplied collateral with transparent rates. Monitor your health factor to avoid liquidation.',
      color: '#f87171'
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 48, color: '#a78bfa' }} />,
      title: 'Portfolio Dashboard',
      description: 'Track all your DeFi positions in real-time. See total supplied, borrowed amounts, net worth, and health factor.',
      color: '#a78bfa'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: '#fbbf24' }} />,
      title: 'Risk Management',
      description: 'Advanced health factor monitoring with liquidation alerts. Color-coded risk indicators keep your positions safe.',
      color: '#fbbf24'
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 48, color: '#60a5fa' }} />,
      title: 'Real-Time Data',
      description: 'Connected to DefiLlama API for live Compound V3 rates. No fake data - see actual market conditions.',
      color: '#60a5fa'
    }
  ];

  const technologies = [
    { name: 'React', color: '#61dafb' },
    { name: 'Material-UI', color: '#007fff' },
    { name: 'Compound Protocol', color: '#00d395' },
    { name: 'DefiLlama API', color: '#2d74da' },
    { name: 'Recharts', color: '#ff7300' },
    { name: 'Web3 Integration', color: '#f16822' }
  ];

  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box className="glow-card" textAlign="center" p={4} mb={6}>
        <Typography variant="h3" className="electric-text" gutterBottom>
          🚀 Complete DeFi Platform
        </Typography>
        <Typography variant="h6" sx={{ color: '#bfdbfe', mb: 3 }}>
          A comprehensive suite for Compound Protocol lending, borrowing, and analytics
        </Typography>
        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
          {technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech.name}
              sx={{
                bgcolor: `${tech.color}20`,
                color: tech.color,
                border: `1px solid ${tech.color}60`,
                fontWeight: 'bold'
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Platform Overview */}
      <Box className="glow-card" p={4} mb={6}>
        <Typography variant="h4" className="electric-text" gutterBottom textAlign="center">
          🏦 What is Compound Protocol?
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph sx={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.7 }}>
              <strong>Compound</strong> is a decentralized finance (DeFi) protocol that allows users to lend and borrow 
              cryptocurrencies without traditional intermediaries. It operates through smart contracts on the Ethereum blockchain.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Users can supply assets to earn interest or borrow assets by posting collateral. Interest rates are determined 
              algorithmically based on supply and demand, updating in real-time.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                bgcolor: 'rgba(59, 130, 246, 0.1)', 
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: 3, 
                p: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="h5" sx={{ color: '#60a5fa', mb: 2, fontWeight: 'bold' }}>
                🔄 How It Works
              </Typography>
              <Typography variant="body2" sx={{ color: '#bfdbfe' }}>
                1. Supply assets → Earn interest<br/>
                2. Use supplied assets as collateral<br/>
                3. Borrow other assets → Pay interest<br/>
                4. Maintain healthy collateral ratio
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Features Grid */}
      <Typography variant="h4" className="electric-text" gutterBottom textAlign="center" mb={4}>
        ✨ Platform Features
      </Typography>
      <Grid container spacing={3} mb={6}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card 
              className="glow-card"
              sx={{ 
                height: '280px',
                background: `linear-gradient(145deg, #1e293b, #334155)`,
                border: `1px solid ${feature.color}30`,
                '&:hover': {
                  border: `1px solid ${feature.color}60`,
                  boxShadow: `0 0 20px ${feature.color}40`,
                  transform: 'translateY(-5px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box textAlign="center" mb={2}>
                  {feature.icon}
                  <Typography variant="h6" className="electric-text" gutterBottom>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#cbd5e1', 
                    flexGrow: 1, 
                    textAlign: 'center',
                    lineHeight: 1.6
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How to Use */}
      <Box className="glow-card" p={4} mb={6}>
        <Typography variant="h4" className="electric-text" gutterBottom textAlign="center">
          📋 How to Use the Platform
        </Typography>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={3}>
            <Box textAlign="center" p={2}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                bgcolor: '#93c5fd', 
                color: '#0f172a', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                1
              </Box>
              <Typography variant="h6" className="electric-text" gutterBottom>
                Calculate
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Use the calculator to plan your lending or borrowing strategy with real rates
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center" p={2}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                bgcolor: '#4ade80', 
                color: '#0f172a', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                2
              </Box>
              <Typography variant="h6" className="electric-text" gutterBottom>
                Supply
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Supply assets in the Lending page to earn interest and build collateral
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center" p={2}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                bgcolor: '#f87171', 
                color: '#0f172a', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                3
              </Box>
              <Typography variant="h6" className="electric-text" gutterBottom>
                Borrow
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Optionally borrow against your collateral while monitoring health factor
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center" p={2}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                bgcolor: '#a78bfa', 
                color: '#0f172a', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                4
              </Box>
              <Typography variant="h6" className="electric-text" gutterBottom>
                Monitor
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Track all positions in your Portfolio dashboard with real-time updates
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Disclaimer */}
      <Box 
        sx={{ 
          bgcolor: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 3, 
          p: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" sx={{ color: '#f87171', mb: 2, fontWeight: 'bold' }}>
          ⚠️ Educational Demo Platform
        </Typography>
        <Typography variant="body2" sx={{ color: '#fca5a5' }}>
          This is a demonstration platform for educational purposes. While it uses real Compound Protocol rates, 
          all transactions are simulated. Always do your own research before using actual DeFi protocols.
        </Typography>
      </Box>
    </Box>
  );
}
