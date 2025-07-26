// src/pages/Resources.jsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const cardData = [
  {
    title: "📘 Compound Docs",
    description: "Official documentation for developers building on top of Compound Protocol.",
    link: "https://docs.compound.finance/ "
  },
  {
    title: "🛠️ Compound.js SDK",
    description: "JavaScript SDK to interact with Compound contracts easily.",
    link: "https://github.com/compound-finance/compound-js "
  },
  {
    title: "🗳 Compound Governance",
    description: "Learn how governance works and participate in future protocol upgrades.",
    link: "https://compound.finance/governance "
  },
  {
    title: "📚 Tutorials & Guides",
    description: "Step-by-step guides to help you start building with Compound.",
    link: "https://docs.compound.finance/tutorials "
  },
  {
    title: "🔧 Developer Tools",
    description: "Use The Graph, Hardhat, and other tools to debug and deploy smart contracts.",
    link: "#"
  }
];

export default function Resources() {
  return (
    <Box sx={{ py: 4 }}>
      {/* Neon Heading */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#f8fafc',
            textShadow: '0 0 8px rgba(147, 197, 255, 0.1)',
            letterSpacing: '1px',
          }}
        >
          🔗 Resources for DeFi Builders
        </Typography>
        <Typography variant="body1" sx={{ color: '#bfdbfe', mt: 1 }}>
          Everything you need to build with Compound Finance.
        </Typography>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={4} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
            <Box
              className="glow-card"
              sx={{
                padding: '1.5rem',
                minHeight: '160px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-8px)',
                },
                cursor: 'pointer'
              }}
              onClick={() => window.open(card.link, '_blank')}
            >
              <Typography variant="h6" className="electric-text" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#bfdbfe' }}>
                {card.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Footer with Name + Links */}
      <Box mt={8} textAlign="center">
        <Typography variant="body2" sx={{ color: '#93c5fd' }}>
          👤 Built by: <strong>S.M. Santosh Reddy</strong>
        </Typography>
        <Box mt={1} display="flex" justifyContent="center" gap={2}>
          <Typography
            component="a"
            href="https://www.linkedin.com/in/santosh-reddy-95a342283/ "
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#60a5fa',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            🔗 LinkedIn
          </Typography>
          <Typography
            component="a"
            href="https://github.com/santoshreddy-1362004 "
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#60a5fa',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            🐙 GitHub
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}