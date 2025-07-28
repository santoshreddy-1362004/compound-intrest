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
      {/* Professional Hero Section */}
      <Box 
        className="glow-card" 
        sx={{ 
          textAlign: 'center', 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography variant="h3" className="electric-text" gutterBottom>
          📊 Portfolio Dashboard
        </Typography>
        <Typography variant="h6" sx={{ color: '#94a3b8', mb: 3 }}>
          Professional DeFi Portfolio Management
        </Typography>
        
        {/* Quick Stats Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 4, 
          flexWrap: 'wrap',
          mt: 3
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#4ade80', fontWeight: 'bold' }}>
              ${portfolio.totalSupplied.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              TOTAL SUPPLIED
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
              ${portfolio.totalBorrowed.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              TOTAL BORROWED
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#93c5fd', fontWeight: 'bold' }}>
              ${portfolio.netWorth.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              NET WORTH
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Professional Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        {/* Health Factor - Priority Card */}
        <Grid item xs={12} md={6}>
          <Card 
            className="glow-card" 
            sx={{ 
              height: '200px',
              background: `linear-gradient(135deg, ${
                portfolio.healthFactor > 2 ? 'rgba(34, 197, 94, 0.1)' : 
                portfolio.healthFactor > 1.5 ? 'rgba(245, 158, 11, 0.1)' : 
                'rgba(239, 68, 68, 0.1)'
              } 0%, rgba(30, 41, 59, 0.8) 100%)`,
              border: `1px solid ${getHealthColor(portfolio.healthFactor)}40`
            }}
          >
            <CardContent sx={{ 
              p: 4, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                fontSize: 60, 
                color: getHealthColor(portfolio.healthFactor), 
                mb: 2,
                textShadow: `0 0 20px ${getHealthColor(portfolio.healthFactor)}50`
              }}>
                🛡️
              </Box>
              <Typography variant="h3" sx={{ 
                color: getHealthColor(portfolio.healthFactor), 
                fontWeight: 'bold', 
                mb: 1,
                textShadow: `0 0 10px ${getHealthColor(portfolio.healthFactor)}30`
              }}>
                {portfolio.healthFactor > 999 ? '∞' : portfolio.healthFactor.toFixed(2)}
              </Typography>
              <Typography variant="h6" sx={{ color: '#94a3b8', mb: 1 }}>
                Health Factor
              </Typography>
              <Typography variant="caption" sx={{ 
                color: '#64748b',
                textAlign: 'center',
                px: 2
              }}>
                {portfolio.healthFactor > 2 ? 'EXCELLENT - Very Safe Position' : 
                 portfolio.healthFactor > 1.5 ? 'GOOD - Monitor Closely' : 
                 'RISK - Consider Adding Collateral'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Overview */}
        <Grid item xs={12} md={6}>
          <Card 
            className="glow-card" 
            sx={{ 
              height: '200px',
              background: 'linear-gradient(135deg, rgba(147, 197, 255, 0.05) 0%, rgba(30, 41, 59, 0.95) 100%)',
              border: '1px solid rgba(147, 197, 255, 0.2)'
            }}
          >
            <CardContent sx={{ p: 0, height: '100%' }}>
              {/* Professional Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid rgba(147, 197, 255, 0.2)',
                background: 'rgba(147, 197, 255, 0.1)'
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#93c5fd', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  📈 Performance Overview
                  <Box sx={{ 
                    ml: 'auto',
                    px: 2,
                    py: 0.5,
                    bgcolor: 'rgba(147, 197, 255, 0.2)',
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    color: '#93c5fd'
                  }}>
                    Net: +${(portfolioData.totalEarned - portfolioData.totalInterestPaid).toFixed(0)}
                  </Box>
                </Typography>
              </Box>
              
              {/* Performance Content */}
              <Box sx={{ p: 3, height: 'calc(100% - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" sx={{ color: '#94a3b8', fontWeight: '500' }}>
                    Interest Earned
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#4ade80', fontWeight: 'bold' }}>
                    +${portfolioData.totalEarned}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" sx={{ color: '#94a3b8', fontWeight: '500' }}>
                    Interest Paid
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                    -${portfolioData.totalInterestPaid}
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  pt: 2, 
                  borderTop: '1px solid rgba(147, 197, 255, 0.2)',
                  mt: 'auto'
                }}>
                  <Typography variant="body1" sx={{ color: '#f8fafc', fontWeight: 'bold' }}>
                    Net Performance
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    color: '#93c5fd', 
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(147, 197, 255, 0.3)'
                  }}>
                    +${(portfolioData.totalEarned - portfolioData.totalInterestPaid).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Professional Asset Tables */}
      <Grid container spacing={4} mb={4}>
        {/* Supplied Assets - Premium Table */}
        <Grid item xs={12} lg={6}>
          <Card 
            className="glow-card" 
            sx={{ 
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(30, 41, 59, 0.95) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Table Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
                background: 'rgba(34, 197, 94, 0.1)'
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#4ade80', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  💰 Supplied Assets
                  <Box sx={{ 
                    ml: 'auto',
                    px: 2,
                    py: 0.5,
                    bgcolor: 'rgba(34, 197, 94, 0.2)',
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    color: '#4ade80'
                  }}>
                    {suppliedAssets.length} Assets
                  </Box>
                </Typography>
              </Box>
              
              {/* Professional Table */}
              <TableContainer sx={{ bgcolor: 'transparent' }}>
                <Table sx={{ bgcolor: 'transparent' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        color: '#4ade80', 
                        fontWeight: 'bold',
                        bgcolor: 'transparent',
                        borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Asset</TableCell>
                      <TableCell sx={{ 
                        color: '#4ade80', 
                        fontWeight: 'bold',
                        bgcolor: 'transparent',
                        borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Balance</TableCell>
                      <TableCell sx={{ 
                        color: '#4ade80', 
                        fontWeight: 'bold',
                        bgcolor: 'transparent',
                        borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>APY</TableCell>
                      <TableCell sx={{ 
                        color: '#4ade80', 
                        fontWeight: 'bold',
                        bgcolor: 'transparent',
                        borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Earned</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {suppliedAssets.map((asset, index) => (
                      <TableRow 
                        key={asset.symbol} 
                        sx={{ 
                          bgcolor: 'transparent',
                          '&:hover': {
                            bgcolor: 'rgba(34, 197, 94, 0.1)',
                            transform: 'translateX(4px)',
                            transition: 'all 0.2s ease'
                          },
                          '&:last-child td': { borderBottom: 'none' }
                        }}
                      >
                        <TableCell sx={{ 
                          bgcolor: 'transparent',
                          borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                          py: 2
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: ['#f59e0b', '#3b82f6', '#8b5cf6'][index] || '#94a3b8',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.875rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}>
                              {asset.symbol.charAt(0)}
                            </Box>
                            <Typography variant="body1" sx={{ 
                              color: '#f8fafc', 
                              fontWeight: 'bold' 
                            }}>
                              {asset.symbol}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ 
                          color: '#f8fafc',
                          bgcolor: 'transparent',
                          borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                          fontWeight: 'bold'
                        }}>
                          {asset.symbol === 'ETH' ? asset.amount.toFixed(4) : asset.amount.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ 
                          bgcolor: 'transparent',
                          borderBottom: '1px solid rgba(51, 65, 85, 0.5)'
                        }}>
                          <Chip 
                            label={`${asset.apy}%`} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(34, 197, 94, 0.2)', 
                              color: '#4ade80',
                              fontWeight: 'bold',
                              border: '1px solid rgba(34, 197, 94, 0.3)'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ 
                          color: '#4ade80', 
                          fontWeight: 'bold',
                          bgcolor: 'transparent',
                          borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                          fontSize: '1rem'
                        }}>
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

        {/* Borrowed Assets - Premium Table */}
        <Grid item xs={12} lg={6}>
          <Card 
            className="glow-card" 
            sx={{ 
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(30, 41, 59, 0.95) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Table Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                background: 'rgba(239, 68, 68, 0.1)'
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#ef4444', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  🏦 Borrowed Assets
                  <Box sx={{ 
                    ml: 'auto',
                    px: 2,
                    py: 0.5,
                    bgcolor: 'rgba(239, 68, 68, 0.2)',
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    color: '#ef4444'
                  }}>
                    {borrowedAssets.length} Assets
                  </Box>
                </Typography>
              </Box>
              
              {/* Professional Table */}
              <TableContainer sx={{ bgcolor: 'transparent' }}>
                <Table sx={{ bgcolor: 'transparent' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        color: '#ef4444', 
                        fontWeight: 'bold',
                        bgcolor: 'transparent',
                        borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Asset</TableCell>
                      <TableCell sx={{ 
                        color: '#ef4444', 
                        fontWeight: 'bold',
                        bgcolor: 'transparent',
                        borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Balance</TableCell>
                      <TableCell sx={{ 
                        color: '#ef4444', 
                        fontWeight: 'bold',
                        bgcolor: 'transparent',
                        borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>APR</TableCell>
                      <TableCell sx={{ 
                        color: '#ef4444', 
                        fontWeight: 'bold',
                        bgcolor: 'transparent',
                        borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Interest</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {borrowedAssets.map((asset, index) => (
                      <TableRow 
                        key={asset.symbol} 
                        sx={{ 
                          bgcolor: 'transparent',
                          '&:hover': {
                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                            transform: 'translateX(4px)',
                            transition: 'all 0.2s ease'
                          },
                          '&:last-child td': { borderBottom: 'none' }
                        }}
                      >
                        <TableCell sx={{ 
                          bgcolor: 'transparent',
                          borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                          py: 2
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: ['#f59e0b', '#3b82f6', '#8b5cf6'][index] || '#94a3b8',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.875rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}>
                              {asset.symbol.charAt(0)}
                            </Box>
                            <Typography variant="body1" sx={{ 
                              color: '#f8fafc', 
                              fontWeight: 'bold' 
                            }}>
                              {asset.symbol}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ 
                          color: '#f8fafc',
                          bgcolor: 'transparent',
                          borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                          fontWeight: 'bold'
                        }}>
                          {asset.symbol === 'ETH' ? asset.amount.toFixed(4) : asset.amount.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ 
                          bgcolor: 'transparent',
                          borderBottom: '1px solid rgba(51, 65, 85, 0.5)'
                        }}>
                          <Chip 
                            label={`${asset.apr}%`} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(239, 68, 68, 0.2)', 
                              color: '#ef4444',
                              fontWeight: 'bold',
                              border: '1px solid rgba(239, 68, 68, 0.3)'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ 
                          color: '#ef4444', 
                          fontWeight: 'bold',
                          bgcolor: 'transparent',
                          borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                          fontSize: '1rem'
                        }}>
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

      {/* Professional Analytics Section */}
      <Grid container spacing={4} mb={4}>
        {/* Portfolio Analytics Chart */}
        <Grid item xs={12} md={8}>
          <Card 
            className="glow-card"
            sx={{ 
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(30, 41, 59, 0.95) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Professional Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
                background: 'rgba(168, 85, 247, 0.1)'
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#a855f7', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  📈 Portfolio Analytics
                  <Box sx={{ 
                    ml: 'auto',
                    px: 2,
                    py: 0.5,
                    bgcolor: 'rgba(168, 85, 247, 0.2)',
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    color: '#a855f7'
                  }}>
                    Real-time Data
                  </Box>
                </Typography>
              </Box>
              
              {/* Chart Content */}
              <Box sx={{ p: 3 }}>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="rgba(168, 85, 247, 0.1)" strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#a855f7" 
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#a855f7" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #a855f7',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="supplied" 
                      stroke="#4ade80" 
                      strokeWidth={3} 
                      name="Supplied"
                      dot={{ fill: '#4ade80', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#4ade80', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="borrowed" 
                      stroke="#ef4444" 
                      strokeWidth={3} 
                      name="Borrowed"
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#ef4444', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="netWorth" 
                      stroke="#a855f7" 
                      strokeWidth={4} 
                      name="Net Worth"
                      dot={{ fill: '#a855f7', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#a855f7', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Asset Allocation with Professional Design */}
        <Grid item xs={12} md={4}>
          <Card 
            className="glow-card"
            sx={{ 
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(30, 41, 59, 0.95) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Professional Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
                background: 'rgba(245, 158, 11, 0.1)'
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#f59e0b', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  🎯 Asset Allocation
                  <Box sx={{ 
                    ml: 'auto',
                    px: 2,
                    py: 0.5,
                    bgcolor: 'rgba(245, 158, 11, 0.2)',
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    color: '#f59e0b'
                  }}>
                    {pieData.length} Assets
                  </Box>
                </Typography>
              </Box>
              
              {/* Chart and Legend Content */}
              <Box sx={{ p: 3 }}>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={90}
                      dataKey="value"
                      stroke="rgba(245, 158, 11, 0.3)"
                      strokeWidth={2}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={index} 
                          fill={entry.color}
                          stroke={entry.color}
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)'
                      }}
                      formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Professional Legend */}
                <Box sx={{ mt: 2, maxHeight: '120px', overflowY: 'auto' }}>
                  {pieData.map((entry, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      mb: 1.5,
                      p: 1,
                      borderRadius: 1,
                      border: `1px solid ${entry.color}20`,
                      bgcolor: `${entry.color}05`,
                      '&:hover': {
                        bgcolor: `${entry.color}10`,
                        transform: 'translateX(2px)',
                        transition: 'all 0.2s ease'
                      }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ 
                          width: 16, 
                          height: 16, 
                          bgcolor: entry.color, 
                          borderRadius: '50%',
                          border: `2px solid ${entry.color}`
                        }} />
                        <Typography variant="body2" sx={{ 
                          color: '#f8fafc', 
                          fontWeight: 'bold',
                          fontSize: '0.875rem'
                        }}>
                          {entry.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ 
                        color: entry.color, 
                        fontWeight: 'bold',
                        fontSize: '0.875rem'
                      }}>
                        ${entry.value.toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
