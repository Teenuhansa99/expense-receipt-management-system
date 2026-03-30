import axios from 'axios';
import {
  Expense,
  CreateExpenseInput,
  UpdateExpenseInput,
  ExpenseFilters,
  ExpenseSummary,
  ApiResponse
} from '@/types/expense';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to parse expense data from API
const parseExpense = (expense: any): Expense => ({
  ...expense,
  amount: parseFloat(expense.amount),
});

// Helper function to parse expense summary from API
const parseExpenseSummary = (summary: any): ExpenseSummary => ({
  ...summary,
  totalAmount: parseFloat(summary.totalAmount),
  categoryBreakdown: summary.categoryBreakdown.map((item: any) => ({
    ...item,
    total: parseFloat(item.total),
  })),
});

export const expenseApi = {
  // Get all expenses with optional filters
  async getAllExpenses(filters?: ExpenseFilters): Promise<Expense[]> {
    const params = new URLSearchParams();

    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await api.get<ApiResponse<any[]>>(`/expenses?${params}`);
    return response.data.data.map(parseExpense);
  },

  // Get expense by ID
  async getExpenseById(id: number): Promise<Expense> {
    const response = await api.get<ApiResponse<any>>(`/expenses/${id}`);
    return parseExpense(response.data.data);
  },

  // Create new expense
  async createExpense(data: CreateExpenseInput): Promise<Expense> {
    const response = await api.post<ApiResponse<any>>('/expenses', data);
    return parseExpense(response.data.data);
  },

  // Update expense
  async updateExpense(id: number, data: UpdateExpenseInput): Promise<Expense> {
    const response = await api.put<ApiResponse<any>>(`/expenses/${id}`, data);
    return parseExpense(response.data.data);
  },

  // Delete expense
  async deleteExpense(id: number): Promise<Expense> {
    const response = await api.delete<ApiResponse<any>>(`/expenses/${id}`);
    return parseExpense(response.data.data);
  },

  // Get expense summary
  async getExpenseSummary(): Promise<ExpenseSummary> {
    const response = await api.get<ApiResponse<any>>('/expenses/summary');
    return parseExpenseSummary(response.data.data);
  },
};

export default api;