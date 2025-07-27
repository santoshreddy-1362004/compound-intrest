// src/pages/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { usePortfolio } from '../context/PortfolioContext';
import Footer from '../components/Footer';

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const { portfolio } = usePortfolio();

  // Use real portfolio data instead of mock data
  const portfolioData = portfolio;
  const suppliedAssets = portfolio.suppliedAssets;
  const borrowedAssets = portfolio.borrowedAssets;

  // Generate pie chart data from portfolio
  const pieData = suppliedAssets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.value,
    color: ['#f59e0b', '#3b82f6', '#8b5cf6'][index] || '#94a3b8'
  }));

  // Generate chart data (simplified for now)
  const chartData = [
    { name: 'Current', supplied: portfolioData.totalSupplied, borrowed: portfolioData.totalBorrowed, netWorth: portfolioData.netWorth }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const getHealthColor = (factor) => {
    if (factor > 2) return '#4ade80';
    if (factor > 1.5) return '#f59e0b';
    return '#ef4444';
  };

  if (loading) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" className="electric-text">Loading Portfolio...</Typography>
        <LinearProgress sx={{ mt: 2, bgcolor: '#334155', '& .MuiLinearProgress-bar': { bgcolor: '#93c5fd' } }} />
      </Box>
    );
  }

  // Show empty state if no assets
  if (suppliedAssets.length === 0 && borrowedAssets.length === 0) {
    return (
      <Box sx={{ py: 4 }}>
        <Box className="glow-card" textAlign="center" p={4} mb={4}>
          <Typography variant="h3" className="electric-text" gutterBottom>
            📊 Your DeFi Portfolio
          </Typography>
          <Typography variant="h6" sx={{ color: '#bfdbfe' }}>
            Monitor your lending and borrowing positions in real-time
          </Typography>
        </Box>
        
        <Box className="glow-card" textAlign="center" p={6}>
          <Typography variant="h5" sx={{ color: '#94a3b8', mb: 2 }}>
            🏦 Your portfolio is empty
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Start by supplying assets in the Lending page or borrowing in the Borrowing page.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box className="glow-card" textAlign="center" p={4} mb={4}>
        <Typography variant="h3" className="electric-text" gutterBottom>
          📊 Your DeFi Portfolio
        </Typography>
        <Typography variant="h6" sx={{ color: '#bfdbfe' }}>
          Monitor your lending and borrowing positions in real-time
        </Typography>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glow-card" sx={{ height: '140px' }}>
            <CardContent sx={{ textAlign: 'center', p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#4ade80', mb: 1 }} />
              <Typography variant="h5" sx={{ color: '#4ade80', fontWeight: 'bold', mb: 0.5 }}>
                ${portfolio.totalSupplied.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Total Supplied
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glow-card" sx={{ height: '140px' }}>
            <CardContent sx={{ textAlign: 'center', p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <TrendingDownIcon sx={{ fontSize: 40, color: '#ef4444', mb: 1 }} />
              <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 0.5 }}>
                ${portfolio.totalBorrowed.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Total Borrowed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glow-card" sx={{ height: '140px' }}>
            <CardContent sx={{ textAlign: 'center', p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#93c5fd', mb: 1 }} />
              <Typography variant="h5" sx={{ color: '#93c5fd', fontWeight: 'bold', mb: 0.5 }}>
                ${portfolio.netWorth.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Net Worth
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glow-card" sx={{ height: '140px' }}>
            <CardContent sx={{ textAlign: 'center', p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ fontSize: 40, color: getHealthColor(portfolio.healthFactor), mb: 1 }}>
                🛡️
              </Box>
              <Typography variant="h5" sx={{ color: getHealthColor(portfolio.healthFactor), fontWeight: 'bold', mb: 0.5 }}>
                {portfolio.healthFactor > 999 ? '∞' : portfolio.healthFactor.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Health Factor
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={4} mb={4}>
        {/* Portfolio Over Time */}
        <Grid item xs={12} md={8}>
          <Card className="glow-card">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" className="electric-text" gutterBottom>
                📈 Portfolio Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #93c5fd',
                      color: '#f8fafc'
                    }}
                  />
                  <Line type="monotone" dataKey="supplied" stroke="#4ade80" strokeWidth={2} name="Supplied" />
                  <Line type="monotone" dataKey="borrowed" stroke="#ef4444" strokeWidth={2} name="Borrowed" />
                  <Line type="monotone" dataKey="netWorth" stroke="#93c5fd" strokeWidth={3} name="Net Worth" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Asset Allocation */}
        <Grid item xs={12} md={4}>
          <Card className="glow-card">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" className="electric-text" gutterBottom>
                🥧 Asset Allocation
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #93c5fd',
                      color: '#f8fafc'
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Tables */}
      <Grid container spacing={4}>
        {/* Supplied Assets */}
        <Grid item xs={12} md={6}>
          <Card className="glow-card">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" className="electric-text" gutterBottom>
                💰 Supplied Assets
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Asset</TableCell>
                      <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Amount</TableCell>
                      <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>APY</TableCell>
                      <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Earned</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {suppliedAssets.map((asset) => (
                      <TableRow key={asset.symbol}>
                        <TableCell sx={{ color: '#f8fafc', fontWeight: 'bold' }}>
                          {asset.symbol}
                        </TableCell>
                        <TableCell sx={{ color: '#f8fafc' }}>
                          {asset.symbol === 'ETH' ? asset.amount.toFixed(2) : asset.amount.toLocaleString()} {asset.symbol}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={`${asset.apy}%`} 
                            size="small" 
                            sx={{ bgcolor: '#4ade8030', color: '#4ade80' }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#4ade80', fontWeight: 'bold' }}>
                          +${asset.earned}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Borrowed Assets */}
        <Grid item xs={12} md={6}>
          <Card className="glow-card">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" className="electric-text" gutterBottom>
                🏦 Borrowed Assets
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Asset</TableCell>
                      <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Amount</TableCell>
                      <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>APR</TableCell>
                      <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Interest</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {borrowedAssets.map((asset) => (
                      <TableRow key={asset.symbol}>
                        <TableCell sx={{ color: '#f8fafc', fontWeight: 'bold' }}>
                          {asset.symbol}
                        </TableCell>
                        <TableCell sx={{ color: '#f8fafc' }}>
                          {asset.symbol === 'ETH' ? asset.amount.toFixed(2) : asset.amount.toLocaleString()} {asset.symbol}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={`${asset.apr}%`} 
                            size="small" 
                            sx={{ bgcolor: '#ef444430', color: '#ef4444' }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                          -${asset.paid}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Summary Stats */}
      <Box className="glow-card" mt={4} p={4}>
        <Typography variant="h6" className="electric-text" gutterBottom>
          📋 Portfolio Summary
        </Typography>
        <Grid container spacing={4} mt={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ color: '#f8fafc', mb: 1 }}>
              💰 <strong>Total Interest Earned:</strong> 
              <span style={{ color: '#4ade80', marginLeft: 8 }}>+${portfolioData.totalEarned}</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#f8fafc' }}>
              💸 <strong>Total Interest Paid:</strong> 
              <span style={{ color: '#ef4444', marginLeft: 8 }}>-${portfolioData.totalInterestPaid}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ color: '#f8fafc', mb: 1 }}>
              📊 <strong>Net Interest:</strong> 
              <span style={{ color: '#93c5fd', marginLeft: 8 }}>
                +${(portfolioData.totalEarned - portfolioData.totalInterestPaid).toFixed(2)}
              </span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#f8fafc' }}>
              🔒 <strong>Collateralization Ratio:</strong> 
              <span style={{ color: getHealthColor(portfolioData.healthFactor), marginLeft: 8 }}>
                {((portfolioData.totalSupplied / portfolioData.totalBorrowed) * 100).toFixed(0)}%
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
