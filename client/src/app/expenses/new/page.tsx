'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { expenseApi } from '@/services/api';
import { CreateExpenseInput } from '@/types/expense';
import { ArrowLeft, Save, RotateCcw } from 'lucide-react';

export default function AddExpensePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateExpenseInput>({
    title: '',
    amount: 0,
    category: '',
    expenseDate: new Date().toISOString().split('T')[0],
    receiptUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be a valid positive number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.expenseDate) {
      newErrors.expenseDate = 'Date is required';
    }

    if (formData.receiptUrl && !isValidUrl(formData.receiptUrl)) {
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

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await expenseApi.createExpense(formData);
      router.push('/');
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Failed to create expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      amount: 0,
      category: '',
      expenseDate: new Date().toISOString().split('T')[0],
      receiptUrl: '',
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof CreateExpenseInput, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Layout title="Add Expense">
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

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Expense</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
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
                type="number"
                step="0.01"
                min="0"
                value={formData.amount || ''}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
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
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
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
                type="date"
                value={formData.expenseDate}
                onChange={(e) => handleInputChange('expenseDate', e.target.value)}
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
                type="url"
                value={formData.receiptUrl || ''}
                onChange={(e) => handleInputChange('receiptUrl', e.target.value)}
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
                disabled={loading}
                className="flex items-center space-x-2 rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-white hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : 'Save Expense'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center space-x-2 rounded-md bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-white hover:from-amber-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>

              <Link
                href="/"
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