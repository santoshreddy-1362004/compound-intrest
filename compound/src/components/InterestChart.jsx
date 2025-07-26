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

export default function InterestChart({ data }) {
  console.log('Chart data received:', data); // Debug log
  
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h4 className="neon-text">📈 Interest Growth Over Time</h4>
        <p style={{ color: '#cbd5e1', textAlign: 'center', padding: '2rem' }}>
          No data available for chart
        </p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h4 className="neon-text">📈 Interest Growth Over Time</h4>
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
              border: '1px solid #a855f7',
              color: '#f8fafc'
            }}
            formatter={(value) => [`$${parseFloat(value).toLocaleString()}`, 'Balance']}
            labelFormatter={(label) => label}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#a855f7"
            strokeWidth={2}
            dot={{ r: 4, fill: '#a855f7' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}