// src/components/InterestChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function InterestChart({ data, calculationType = 'lending' }) {
  console.log('Chart data received:', data); // Debug log
  
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h4 className="neon-text">
          {calculationType === 'lending' ? '📈 Earnings Growth Over Time' : '📉 Interest Cost Over Time'}
        </h4>
        <p style={{ color: '#cbd5e1', textAlign: 'center', padding: '2rem' }}>
          No data available for chart
        </p>
      </div>
    );
  }

  const chartColor = calculationType === 'lending' ? '#4ade80' : '#f87171';
  const chartTitle = calculationType === 'lending' ? '📈 Earnings Growth Over Time' : '📉 Interest Cost Over Time';

  return (
    <div className="chart-container">
      <h4 className="neon-text">{chartTitle}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#334155" />
          <XAxis dataKey="name" stroke="#d1d5db" />
          <YAxis stroke="#d1d5db" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: `1px solid ${chartColor}`,
              color: '#f8fafc'
            }}
            formatter={(value) => [`$${parseFloat(value).toLocaleString()}`, calculationType === 'lending' ? 'Balance' : 'Total Debt']}
            labelFormatter={(label) => label}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            dot={{ r: 4, fill: chartColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}