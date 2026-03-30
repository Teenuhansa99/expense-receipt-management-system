export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  expense_date: string;
  receipt_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseInput {
  title: string;
  amount: number;
  category: string;
  expenseDate: string;
  receiptUrl?: string;
}

export interface UpdateExpenseInput {
  title?: string;
  amount?: number;
  category?: string;
  expenseDate?: string;
  receiptUrl?: string | null;
}

export interface ExpenseFilters {
  search?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export interface ExpenseSummary {
  totalCount: number;
  totalAmount: number;
  categoryBreakdown: {
    category: string;
    total: number;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}