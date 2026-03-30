'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CategoryChartProps {
  data: { category: string; total: number }[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
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
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Monthly Spending</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: any) => [`Rs. ${Number(value).toFixed(2)}`, 'Amount']} />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}