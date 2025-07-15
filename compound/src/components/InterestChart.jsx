// src/components/InterestChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function InterestChart({ data }) {
  return (
    <div className="chart-container">
      <h4 className="neon-text">Interest Growth Over Time</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />
          <XAxis dataKey="name" stroke="#d1d5db" />
          <YAxis stroke="#d1d5db" />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #4f46e5' }} />
          <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}