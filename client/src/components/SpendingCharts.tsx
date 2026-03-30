'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell, Label } from 'recharts';
import { TrendingUp, Layers } from 'lucide-react';

interface CategoryChartProps {
  data: { category: string; total: number }[];
}

// Custom tooltip component for Category Chart
const CustomCategoryTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-gray-900 px-4 py-3 shadow-xl border border-gray-700">
        <p className="text-sm font-semibold text-white">{payload[0].payload.category}</p>
        <p className="text-lg font-bold text-emerald-400">
          Rs. {Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

// Custom tooltip component for Monthly Chart
const CustomMonthlyTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-gray-900 px-4 py-3 shadow-xl border border-gray-700">
        <p className="text-sm font-semibold text-white">{payload[0].payload.month}</p>
        <p className="text-lg font-bold text-blue-400">
          Rs. {Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export function CategoryChart({ data }: CategoryChartProps) {
  const gradients = [
    { id: 'grad1', start: '#0EA5E9', end: '#06B6D4' },      // Sky to Cyan
    { id: 'grad2', start: '#10B981', end: '#34D399' },      // Emerald to Emerald Light
    { id: 'grad3', start: '#F59E0B', end: '#FBBF24' },      // Amber
    { id: 'grad4', start: '#8B5CF6', end: '#A78BFA' },      // Violet
    { id: 'grad5', start: '#3B82F6', end: '#60A5FA' },      // Blue
    { id: 'grad6', start: '#EC4899', end: '#F472B6' },      // Pink
    { id: 'grad7', start: '#EF4444', end: '#F87171' },      // Red
    { id: 'grad8', start: '#84CC16', end: '#A3E635' },      // Lime
  ];

  // Sort data by total in descending order
  const sortedData = [...data].sort((a, b) => b.total - a.total);

  return (
    <div className="h-full rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 p-3">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Spending by Category</h3>
            <p className="text-sm text-gray-500 mt-1">Category-wise expense breakdown</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
          >
            <defs>
              {gradients.map((grad) => (
                <linearGradient
                  key={grad.id}
                  id={grad.id}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={grad.start} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={grad.end} stopOpacity={1} />
                </linearGradient>
              ))}
            </defs>
            
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="#E5E7EB" 
              vertical={false}
              opacity={0.2}
            />
            
            <XAxis 
              type="number" 
              stroke="#D1D5DB"
              style={{ fontSize: '11px', fontWeight: '500' }}
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
            />
            
            <YAxis 
              dataKey="category" 
              type="category" 
              stroke="#D1D5DB"
              width={95}
              style={{ fontSize: '12px', fontWeight: '500' }}
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: '#6B7280' }}
            />
            
            <Tooltip content={<CustomCategoryTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }} />
            
            <Bar 
              dataKey="total" 
              radius={[0, 8, 8, 0]}
              animationDuration={600}
              animationEasing="ease-out"
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#${gradients[index % gradients.length].id})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Categories</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{data.length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Highest Spend</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            Rs. {Math.max(...data.map(d => d.total), 0).toFixed(0)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Spending</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            Rs. {data.reduce((sum, d) => sum + d.total, 0).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
}

interface MonthlyChartProps {
  data: { month: string; total: number }[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const gradients = [
    { id: 'monthGrad1', start: '#3B82F6', end: '#60A5FA' },    // Blue
    { id: 'monthGrad2', start: '#06B6D4', end: '#22D3EE' },    // Cyan
    { id: 'monthGrad3', start: '#0EA5E9', end: '#38BDF8' },    // Sky
  ];

  return (
    <div className="h-full rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-400 to-cyan-600 p-3">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Monthly Spending Trend</h3>
            <p className="text-sm text-gray-500 mt-1">Spending pattern over time</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
            <defs>
              {gradients.map((grad) => (
                <linearGradient
                  key={grad.id}
                  id={grad.id}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={grad.start} stopOpacity={1} />
                  <stop offset="100%" stopColor={grad.end} stopOpacity={0.7} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid 
              strokeDasharray="0" 
              stroke="#E5E7EB" 
              vertical={false}
              opacity={0.2}
            />

            <XAxis 
              dataKey="month" 
              stroke="#D1D5DB"
              style={{ fontSize: '12px', fontWeight: '500' }}
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tick={{ fill: '#6B7280' }}
            />

            <YAxis 
              stroke="#D1D5DB"
              style={{ fontSize: '11px', fontWeight: '500' }}
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tick={{ fill: '#6B7280' }}
            />

            <Tooltip 
              content={<CustomMonthlyTooltip />} 
              cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
            />

            <Bar 
              dataKey="total" 
              radius={[8, 8, 0, 0]}
              animationDuration={600}
              animationEasing="ease-out"
              label={{
                position: 'top',
                fill: '#1F2937',
                fontSize: 12,
                fontWeight: 600,
                formatter: (value: any) => `Rs. ${(value / 1000).toFixed(1)}k`
              }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#${gradients[index % gradients.length].id})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Months</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{data.length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Peak Month</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            Rs. {Math.max(...data.map(d => d.total), 0).toFixed(0)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Average Month</p>
          <p className="text-2xl font-bold text-cyan-600 mt-1">
            Rs. {(data.reduce((sum, d) => sum + d.total, 0) / data.length || 0).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
}