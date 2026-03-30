'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { expenseApi } from '@/services/api';
import { Expense, UpdateExpenseInput } from '@/types/expense';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

function EditExpenseContent() {
  const params = useParams();
  const router = useRouter();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = (formData: UpdateExpenseInput) => {
    const newErrors: Record<string, string> = {};

    if (formData.title !== undefined && !formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.amount !== undefined && (formData.amount <= 0 || isNaN(formData.amount))) {
      newErrors.amount = 'Amount must be a valid positive number';
    }

    if (formData.category !== undefined && !formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.expenseDate !== undefined && !formData.expenseDate) {
      newErrors.expenseDate = 'Date is required';
    }

    if (formData.receiptUrl !== undefined && formData.receiptUrl && !isValidUrl(formData.receiptUrl)) {
      newErrors.receiptUrl = 'Receipt URL must be a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense) return;

    const formData = {
      title: (document.getElementById('title') as HTMLInputElement).value,
      amount: parseFloat((document.getElementById('amount') as HTMLInputElement).value),
      category: (document.getElementById('category') as HTMLSelectElement).value,
      expenseDate: (document.getElementById('expenseDate') as HTMLInputElement).value,
      receiptUrl: (document.getElementById('receiptUrl') as HTMLInputElement).value || undefined,
    };

    if (!validateForm(formData)) {
      return;
    }

    setSaving(true);
    try {
      await expenseApi.updateExpense(expense.id, formData);
      router.push(`/expenses/${expense.id}`);
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense. Please try again.');
    } finally {
      setSaving(false);
    }
  };

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
      <Layout title="Edit Expense">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!expense) {
    return (
      <Layout title="Edit Expense">
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
    <Layout title="Edit Expense">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/expenses/${expense.id}`}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Expense Details</span>
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Expense</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                defaultValue={expense.title}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter expense title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                defaultValue={expense.amount}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                defaultValue={expense.category}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                id="expenseDate"
                type="date"
                defaultValue={expense.expense_date}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.expenseDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.expenseDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expenseDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receipt URL
              </label>
              <input
                id="receiptUrl"
                type="url"
                defaultValue={expense.receipt_url || ''}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.receiptUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/receipt.jpg"
              />
              {errors.receiptUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.receiptUrl}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">Optional: URL to receipt image</p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-white hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Updating...' : 'Update Expense'}</span>
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center space-x-2 rounded-md bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2 text-white hover:from-pink-600 hover:to-rose-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>

              <Link
                href={`/expenses/${expense.id}`}
                className="flex items-center space-x-2 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default function EditExpensePage() {
  return (
    <ProtectedRoute>
      <EditExpenseContent />
    </ProtectedRoute>
  );
}