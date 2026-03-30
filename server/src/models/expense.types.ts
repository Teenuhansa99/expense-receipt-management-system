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