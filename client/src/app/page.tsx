'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { SummaryCards } from '@/components/SummaryCards';
import { RecentExpensesTable } from '@/components/RecentExpensesTable';
import { QuickActions } from '@/components/QuickActions';
import { CategoryChart } from '@/components/SpendingCharts';
import { expenseApi } from '@/services/api';
import { Expense, ExpenseSummary } from '@/types/expense';
import { getCurrentMonthExpenses, getCategoryStats } from '@/utils/formatters';

export default function Dashboard() {
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

  const handleDeleteExpense = async (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseApi.deleteExpense(id);
        setExpenses(expenses.filter(expense => expense.id !== id));
        // Refresh summary
        const summaryData = await expenseApi.getExpenseSummary();
        setSummary(summaryData);
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  const categoryStats = getCategoryStats(expenses);
  const thisMonthAmount = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const receiptsCount = expenses.filter(expense => expense.receipt_url).length;

  return (
    <Layout title="Dashboard" showAddButton>
      <div className="space-y-6">
        <SummaryCards
          totalExpenses={summary?.totalCount || 0}
          totalAmount={summary?.totalAmount || 0}
          thisMonthAmount={thisMonthAmount}
          totalCategories={categoryStats.length}
          receiptsCount={receiptsCount}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentExpensesTable expenses={expenses} onDelete={handleDeleteExpense} />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CategoryChart data={categoryStats} />
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Analytics Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Highest Expense:</span>
                <span className="font-medium">
                  Rs. {Math.max(...expenses.map(e => e.amount), 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lowest Expense:</span>
                <span className="font-medium">
                  Rs. {Math.min(...expenses.map(e => e.amount), 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Expense:</span>
                <span className="font-medium">
                  Rs. {(expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expenses with Receipts:</span>
                <span className="font-medium">{receiptsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
