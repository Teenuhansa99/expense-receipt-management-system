'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SummaryCards } from '@/components/SummaryCards';
import { RecentExpensesTable } from '@/components/RecentExpensesTable';
import { QuickActions } from '@/components/QuickActions';
import { CategoryChart, MonthlyChart } from '@/components/SpendingCharts';
import { CreditCard, DollarSign, Calendar, Layers } from 'lucide-react';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';
import { expenseApi } from '@/services/api';
import { Expense, ExpenseSummary } from '@/types/expense';
import { getCurrentMonthExpenses, getCategoryStats, getMonthlyStats } from '@/utils/formatters';

function DashboardContent() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);

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

  const handleDeleteExpense = (id: number) => {
    setSelectedExpenseId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteExpense = async () => {
    if (selectedExpenseId === null) return;

    try {
      await expenseApi.deleteExpense(selectedExpenseId);
      setExpenses(expenses.filter(expense => expense.id !== selectedExpenseId));
      const summaryData = await expenseApi.getExpenseSummary();
      setSummary(summaryData);
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    } finally {
      setDeleteModalOpen(false);
      setSelectedExpenseId(null);
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
  const monthlyData = getMonthlyStats(expenses);
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
          metrics={[
            { title: 'Total Expenses', value: summary?.totalCount || 0, icon: <CreditCard className="h-5 w-5" />, color: 'blue' },
            { title: 'Total Spending', value: `Rs. ${summary?.totalAmount?.toFixed(2) || '0.00'}`, icon: <DollarSign className="h-5 w-5" />, color: 'green' },
            { title: 'This Month', value: `Rs. ${thisMonthAmount.toFixed(2)}`, icon: <Calendar className="h-5 w-5" />, color: 'orange' },
            { title: 'Categories', value: categoryStats.length, icon: <Layers className="h-5 w-5" />, color: 'purple' },
          ]}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentExpensesTable expenses={expenses} onDelete={handleDeleteExpense} />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="min-h-[500px]">
            <CategoryChart data={categoryStats} />
          </div>
          <div className="min-h-[500px]">
            <MonthlyChart data={monthlyData} />
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl border border-gray-100">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">Analytics Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 border border-blue-200">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Highest</p>
              <p className="text-2xl font-bold text-blue-900 mt-2">Rs. {Math.max(...expenses.map(e => e.amount), 0).toFixed(0)}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 border border-emerald-200">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Lowest</p>
              <p className="text-2xl font-bold text-emerald-900 mt-2">Rs. {Math.min(...expenses.map(e => e.amount), 0).toFixed(0)}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 border border-purple-200">
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Average</p>
              <p className="text-2xl font-bold text-purple-900 mt-2">Rs. {(expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length || 0).toFixed(0)}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 p-6 border border-orange-200">
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Receipts</p>
              <p className="text-2xl font-bold text-orange-900 mt-2">{receiptsCount}</p>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteExpense}
        title="Delete this expense?"
        message="This action cannot be undone. All data for this expense will be removed permanently."
      />
    </Layout>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
