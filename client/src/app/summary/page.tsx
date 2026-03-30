'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SummaryCards } from '@/components/SummaryCards';
import { CategoryChart, MonthlyChart } from '@/components/SpendingCharts';
import { expenseApi } from '@/services/api';
import { Expense, ExpenseSummary } from '@/types/expense';
import { formatCurrency, getCurrentMonthExpenses, getCategoryStats, getMonthlyStats } from '@/utils/formatters';

function SummaryContent() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesData, summaryData] = await Promise.all([
          expenseApi.getAllExpenses(),
          expenseApi.getExpenseSummary(),
        ]);
        setExpenses(expensesData);
        setSummary(summaryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout title="Summary">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  const categoryStats = getCategoryStats(expenses);
  const monthlyStats = getMonthlyStats(expenses);
  const thisMonthAmount = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const receiptsCount = expenses.filter(expense => expense.receipt_url).length;

  const highestExpense = Math.max(...expenses.map(e => e.amount), 0);
  const lowestExpense = Math.min(...expenses.map(e => e.amount), 0);
  const averageExpense = expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length || 0;

  return (
    <Layout title="Summary">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary?.totalAmount || 0)}
                </p>
              </div>
              <div className="rounded-full bg-blue-50 p-3">
                <span className="text-lg">💰</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.totalCount || 0}
                </p>
              </div>
              <div className="rounded-full bg-green-50 p-3">
                <span className="text-lg">📊</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Expense</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(averageExpense)}
                </p>
              </div>
              <div className="rounded-full bg-purple-50 p-3">
                <span className="text-lg">📈</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(thisMonthAmount)}
                </p>
              </div>
              <div className="rounded-full bg-orange-50 p-3">
                <span className="text-lg">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="space-y-8">
          {/* Charts Grid - Full Width */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="min-h-[500px]">
              <CategoryChart data={categoryStats} />
            </div>
            <div className="min-h-[500px]">
              <MonthlyChart data={monthlyStats} />
            </div>
          </div>

          {/* Insights Card */}
          <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl border border-gray-100">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Expense Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 border border-blue-200">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Highest Expense</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{formatCurrency(highestExpense)}</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Lowest Expense</p>
                <p className="text-3xl font-bold text-emerald-900 mt-2">{formatCurrency(lowestExpense)}</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 border border-purple-200">
                <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Average Expense</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">{formatCurrency(expenses.length > 0 ? expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length : 0)}</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 p-6 border border-orange-200">
                <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Receipts</p>
                <p className="text-3xl font-bold text-orange-900 mt-2">{receiptsCount}</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 p-6 border border-pink-200">
                <p className="text-sm font-semibold text-pink-600 uppercase tracking-wide">No Receipts</p>
                <p className="text-3xl font-bold text-pink-900 mt-2">{(summary?.totalCount || 0) - receiptsCount}</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 border border-cyan-200">
                <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">Top Category</p>
                <p className="text-3xl font-bold text-cyan-900 mt-2">
                  {categoryStats.length > 0 ? categoryStats[0].category : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Table */}
        <div className="rounded-lg bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900">Category Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Number of Expenses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {categoryStats.map((category) => {
                  const percentage = summary?.totalAmount
                    ? ((category.total / summary.totalAmount) * 100).toFixed(1)
                    : '0';
                  const expenseCount = expenses.filter(e => e.category === category.category).length;

                  return (
                    <tr key={category.category} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {category.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {expenseCount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        {formatCurrency(category.total)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function SummaryPage() {
  return (
    <ProtectedRoute>
      <SummaryContent />
    </ProtectedRoute>
  );
}