'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { expenseApi } from '@/services/api';
import { Expense } from '@/types/expense';
import { formatCurrency, formatDate, formatDateTime } from '@/utils/formatters';
import { ArrowLeft, Edit, Trash2, ExternalLink } from 'lucide-react';

export default function ExpenseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);

  const id = params.id as string;

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const data = await expenseApi.getExpenseById(Number(id));
        setExpense(data);
      } catch (error) {
        console.error('Error fetching expense:', error);
        alert('Expense not found');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExpense();
    }
  }, [id, router]);

  const handleDelete = async () => {
    if (!expense) return;

    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseApi.deleteExpense(expense.id);
        router.push('/');
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  if (loading) {
    return (
      <Layout title="Expense Details">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!expense) {
    return (
      <Layout title="Expense Details">
        <div className="text-center py-12">
          <p className="text-gray-500">Expense not found.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Expense Details">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{expense.title}</h2>
            <div className="flex space-x-2">
              <Link
                href={`/expenses/${expense.id}/edit`}
                className="flex items-center space-x-2 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2 text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 rounded-md bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2 text-white hover:from-pink-600 hover:to-rose-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-100">
                <label className="block text-sm font-medium text-cyan-800">Amount</label>
                <p className="text-lg font-semibold text-cyan-900">
                  {formatCurrency(expense.amount)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
                <label className="block text-sm font-medium text-emerald-800">Category</label>
                <p className="text-lg text-emerald-900">{expense.category}</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                <label className="block text-sm font-medium text-amber-800">Date</label>
                <p className="text-lg text-amber-900">{formatDate(expense.expense_date)}</p>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-lg border border-violet-100">
                <label className="block text-sm font-medium text-violet-800">Receipt</label>
                <p className="text-lg text-violet-900">
                  {expense.receipt_url ? (
                    <a
                      href={expense.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-violet-600 hover:text-violet-800 transition-colors duration-200"
                    >
                      <span>View Receipt</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="text-gray-500">No receipt attached</span>
                  )}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created At</label>
                  <p className="text-sm text-gray-600">{formatDateTime(expense.created_at)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Updated At</label>
                  <p className="text-sm text-gray-600">{formatDateTime(expense.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}