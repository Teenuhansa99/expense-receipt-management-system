'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CategoryChartProps {
  data: { category: string; total: number }[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  const COLORS = [
    '#06B6D4', // cyan-500
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#8B5CF6', // violet-500
    '#3B82F6', // blue-500
    '#EC4899', // pink-500
    '#EF4444', // red-500
    '#84CC16', // lime-500
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Spending by Category</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="total"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => [`Rs. ${Number(value).toFixed(2)}`, 'Amount']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface MonthlyChartProps {
  data: { month: string; total: number }[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Monthly Spending</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              formatter={(value: any) => [`Rs. ${Number(value).toFixed(2)}`, 'Amount']}
              contentStyle={{
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="total" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}