// src/pages/About.jsx
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, Fade, Grow } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Footer from '../components/Footer';

export default function About() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);

  const features = [
    {
      icon: <CalculateIcon sx={{ fontSize: 36, color: '#93c5fd' }} />,
      title: 'Interest Calculator',
      description: 'Calculate real-time lending and borrowing costs using live Compound Protocol rates.',
      color: '#93c5fd'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 36, color: '#4ade80' }} />,
      title: 'Supply & Earn',
      description: 'Supply DAI, USDC, or ETH to earn competitive interest rates.',
      color: '#4ade80'
    },
    {
      icon: <TrendingDownIcon sx={{ fontSize: 36, color: '#f87171' }} />,
      title: 'Borrow Assets',
      description: 'Borrow against your supplied collateral with transparent rates.',
      color: '#f87171'
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 36, color: '#a78bfa' }} />,
      title: 'Portfolio Dashboard',
      description: 'Track all your DeFi positions in real-time.',
      color: '#a78bfa'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 36, color: '#fbbf24' }} />,
      title: 'Risk Management',
      description: 'Advanced health factor monitoring with liquidation alerts.',
      color: '#fbbf24'
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 36, color: '#60a5fa' }} />,
      title: 'Real-Time Data',
      description: 'Connected to Compound V3 rates. No fake data - see actual market conditions.',
      color: '#60a5fa'
    }
  ];

  const technologies = [
    { name: 'React', color: '#61dafb' },
    { name: 'Material-UI', color: '#007fff' },
    { name: 'Compound Protocol', color: '#00d395' },
    { name: 'Recharts', color: '#ff7300' },
    { name: 'Web3 Integration', color: '#f16822' }
  ];

  return (
    <Box sx={{ py: 3, minHeight: '100vh' }}>
      {/* Hero Section */}
      <Fade in={true} timeout={1000}>
        <Box 
          className="glow-card" 
          textAlign="center" 
          p={2} 
          mb={3}
          sx={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(147, 197, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent, rgba(96, 165, 250, 0.1), transparent)',
              animation: 'shimmer 3s ease-in-out infinite',
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' }
            }
          }}
        >
          <Typography 
            variant="h4" 
            className="electric-text" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#ffffff',
              position: 'relative',
              zIndex: 1,
              mb: 1.5
            }}
          >
            🚀 Complete DeFi Platform
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#cbd5e1', 
              mb: 2, 
              fontWeight: 300,
              position: 'relative',
              zIndex: 1,
              maxWidth: '500px',
              margin: '0 auto 16px'
            }}
          >
            A comprehensive suite for Compound Protocol lending, borrowing, and analytics
          </Typography>
          <Box 
            display="flex" 
            gap={1.5} 
            justifyContent="center" 
            flexWrap="wrap"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            {technologies.map((tech, index) => (
              <Grow in={true} timeout={1000 + index * 200} key={index}>
                <Chip
                  label={tech.name}
                  sx={{
                    bgcolor: `${tech.color}15`,
                    color: tech.color,
                    border: `2px solid ${tech.color}40`,
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    py: 1,
                    px: 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: `${tech.color}25`,
                      border: `2px solid ${tech.color}70`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 16px ${tech.color}30`
                    }
                  }}
                />
              </Grow>
            ))}
          </Box>
        </Box>
      </Fade>

      {/* Platform Overview */}
      <Fade in={true} timeout={1500}>
        <Box 
          className="glow-card" 
          p={2.5} 
          mb={3}
          sx={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(147, 197, 255, 0.3)',
            position: 'relative',
            '&:hover': {
              border: '1px solid rgba(147, 197, 255, 0.5)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <Typography 
            variant="h5" 
            className="electric-text" 
            gutterBottom 
            textAlign="center" 
            mb={2.5}
            sx={{
              color: '#ffffff',
              fontWeight: 'bold'
            }}
          >
            🏦 What is Compound Protocol?
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                pr: { md: 2 }
              }}>
                <Typography 
                  variant="body2" 
                  paragraph 
                  sx={{ 
                    color: '#f1f5f9', 
                    fontSize: '1rem', 
                    lineHeight: 1.6,
                    mb: 1.5,
                    fontWeight: 500
                  }}
                >
                  <Box component="span" sx={{ 
                    color: '#4ade80', 
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
                  }}>
                    Compound
                  </Box> is a decentralized finance (DeFi) protocol that allows users to lend and borrow 
                  cryptocurrencies without traditional intermediaries.
                </Typography>
                <Typography 
                  variant="body2" 
                  paragraph 
                  sx={{ 
                    color: '#e2e8f0', 
                    fontSize: '0.9rem', 
                    lineHeight: 1.5,
                    mb: 0,
                    fontWeight: 400
                  }}
                >
                  Users can supply assets to earn interest or borrow assets by posting collateral. Interest rates are determined 
                  algorithmically based on supply and demand.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1))',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: 2, 
                  p: 2,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: { xs: '140px', md: '160px' },
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: '2px solid rgba(59, 130, 246, 0.7)',
                    boxShadow: '0 15px 30px rgba(59, 130, 246, 0.2)',
                    transform: 'scale(1.01)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                    animation: 'slide 2s ease-in-out infinite',
                  },
                  '@keyframes slide': {
                    '0%': { left: '-100%' },
                    '100%': { left: '100%' }
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#ffffff', 
                    mb: 1.5, 
                    fontWeight: 'bold',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  🔄 How It Works
                </Typography>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {[
                    '1. Supply assets → Earn interest',
                    '2. Use supplied assets as collateral',
                    '3. Borrow other assets → Pay interest',
                    '4. Maintain healthy collateral ratio'
                  ].map((step, index) => (
                    <Typography 
                      key={index}
                      variant="caption" 
                      sx={{ 
                        color: '#e2e8f0',
                        lineHeight: 1.6,
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        mb: 0.3,
                        display: 'block',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#60a5fa',
                          transform: 'translateX(8px)'
                        }
                      }}
                    >
                      {step}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Fade>

      {/* Features Grid */}
      <Fade in={true} timeout={2000}>
        <Box mb={3}>
          <Typography 
            variant="h5" 
            className="electric-text" 
            gutterBottom 
            textAlign="center" 
            mb={2.5}
            sx={{
              color: '#ffffff',
              fontWeight: 'bold'
            }}
          >
            ✨ Platform Features
          </Typography>
          <Grid container spacing={2.5}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Grow in={true} timeout={1000 + index * 300}>
                  <Card 
                    className="glow-card"
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    sx={{
                      height: '220px',
                      background: hoveredFeature === index 
                        ? `linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))`
                        : `linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.7))`,
                      border: hoveredFeature === index 
                        ? `2px solid ${feature.color}80`
                        : `1px solid ${feature.color}30`,
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredFeature === index ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
                      boxShadow: hoveredFeature === index 
                        ? `0 15px 30px ${feature.color}20, 0 0 20px ${feature.color}10`
                        : `0 4px 12px rgba(0, 0, 0, 0.1)`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: hoveredFeature === index 
                          ? `linear-gradient(135deg, ${feature.color}06, transparent, ${feature.color}02)`
                          : 'transparent',
                        borderRadius: 'inherit',
                        transition: 'all 0.4s ease'
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      p: 2.5, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <Box textAlign="center" mb={1.5}>
                        <Box sx={{ 
                          transform: hoveredFeature === index ? 'scale(1.05) rotate(2deg)' : 'scale(1)',
                          transition: 'all 0.4s ease',
                          mb: 1
                        }}>
                          {React.cloneElement(feature.icon, { sx: { fontSize: 32, color: feature.color } })}
                        </Box>
                        <Typography 
                          variant="body1" 
                          className="electric-text" 
                          gutterBottom
                          sx={{
                            color: hoveredFeature === index ? feature.color : '#e2e8f0',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: hoveredFeature === index ? '#f1f5f9' : '#cbd5e1', 
                          flexGrow: 1, 
                          textAlign: 'center',
                          lineHeight: 1.5,
                          fontSize: '0.8rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>

      {/* How to Use */}
      <Fade in={true} timeout={2500}>
        <Box 
          className="glow-card" 
          p={2.5} 
          mb={3}
          sx={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(51, 65, 85, 0.8))',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(147, 197, 255, 0.3)',
            '&:hover': {
              border: '1px solid rgba(147, 197, 255, 0.5)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <Typography 
            variant="h5" 
            className="electric-text" 
            gutterBottom 
            textAlign="center"
            mb={2.5}
            sx={{
              color: '#ffffff',
              fontWeight: 'bold'
            }}
          >
            📋 How to Use the Platform
          </Typography>
          <Grid container spacing={2.5} mt={0.5}>
            {[
              { 
                step: '1', 
                title: 'Calculate', 
                desc: 'Plan your strategy with real rates',
                color: '#93c5fd',
                icon: '🧮'
              },
              { 
                step: '2', 
                title: 'Supply', 
                desc: 'Supply assets to earn interest',
                color: '#4ade80',
                icon: '💰'
              },
              { 
                step: '3', 
                title: 'Borrow', 
                desc: 'Borrow against your collateral',
                color: '#f87171',
                icon: '🏦'
              },
              { 
                step: '4', 
                title: 'Monitor', 
                desc: 'Track positions in real-time',
                color: '#a78bfa',
                icon: '📊'
              }
            ].map((item, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box 
                  textAlign="center" 
                  p={2} 
                  sx={{ 
                    height: '160px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    border: `2px solid ${item.color}30`,
                    borderRadius: 2,
                    background: hoveredStep === index 
                      ? `linear-gradient(135deg, ${item.color}15, ${item.color}05)`
                      : 'transparent',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      border: `2px solid ${item.color}70`,
                      background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                      transform: 'translateY(-3px) scale(1.005)',
                      boxShadow: `0 8px 16px ${item.color}20`
                    }
                  }}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <Box sx={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: '50%', 
                    bgcolor: item.color, 
                    color: '#0f172a', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 12px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    boxShadow: `0 6px 12px ${item.color}40`,
                    transform: hoveredStep === index ? 'scale(1.03) rotate(2deg)' : 'scale(1)',
                    transition: 'all 0.4s ease'
                  }}>
                    <Typography sx={{ fontSize: '18px' }}>{item.icon}</Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    className="electric-text" 
                    gutterBottom
                    sx={{
                      color: hoveredStep === index ? item.color : '#e2e8f0',
                      fontWeight: 'bold',
                      mb: 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: hoveredStep === index ? '#f1f5f9' : '#94a3b8',
                      lineHeight: 1.4,
                      fontSize: '0.8rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>

      {/* Developer Info */}
      <Fade in={true} timeout={3000}>
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.1))', 
            border: '2px solid rgba(34, 197, 94, 0.4)',
            borderRadius: 2, 
            p: 2.5,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              border: '2px solid rgba(34, 197, 94, 0.7)',
              boxShadow: '0 15px 30px rgba(34, 197, 94, 0.2)',
              transform: 'translateY(-3px)'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
              animation: 'slideAcross 3s ease-in-out infinite',
            },
            '@keyframes slideAcross': {
              '0%': { left: '-100%' },
              '100%': { left: '100%' }
            }
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#ffffff', 
              mb: 1.5, 
              fontWeight: 'bold',
              position: 'relative',
              zIndex: 1
            }}
          >
            👨‍💻 Built by Santosh Reddy
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#a7f3d0', 
              mb: 2.5,
              lineHeight: 1.5,
              maxWidth: '500px',
              margin: '0 auto 20px',
              position: 'relative',
              zIndex: 1
            }}
          >
            Full-stack developer passionate about DeFi and blockchain technology. 
            This platform demonstrates real-world integration with Compound Protocol.
          </Typography>
          <Box 
            display="flex" 
            gap={2.5} 
            justifyContent="center" 
            flexWrap="wrap"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box 
              component="a"
              href="https://www.linkedin.com/in/santosh-reddy-95a342283"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#ffffff',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '2px solid rgba(96, 165, 250, 0.5)',
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(59, 130, 246, 0.1))',
                backdropFilter: 'blur(10px)',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(59, 130, 246, 0.2))',
                  border: '2px solid rgba(96, 165, 250, 0.8)',
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: '0 8px 16px rgba(96, 165, 250, 0.4)',
                  color: '#60a5fa'
                }
              }}
            >
              <Typography sx={{ fontSize: '18px' }}>💼</Typography>
              <Typography variant="body2" fontWeight="bold">LinkedIn</Typography>
            </Box>
            <Box 
              component="a"
              href="https://github.com/santoshreddy-1362004/compound-intrest"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#ffffff',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '2px solid rgba(167, 139, 250, 0.5)',
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(147, 51, 234, 0.1))',
                backdropFilter: 'blur(10px)',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(147, 51, 234, 0.2))',
                  border: '2px solid rgba(167, 139, 250, 0.8)',
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: '0 8px 16px rgba(167, 139, 250, 0.4)',
                  color: '#a78bfa'
                }
              }}
            >
              <Typography sx={{ fontSize: '18px' }}>🐙</Typography>
              <Typography variant="body2" fontWeight="bold">GitHub</Typography>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
