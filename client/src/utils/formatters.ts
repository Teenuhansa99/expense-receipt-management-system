export const formatCurrency = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `Rs. ${numAmount.toFixed(2)}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getCurrentMonthExpenses = (expenses: any[]): any[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return expenses.filter(expense => {
    const expenseDate = new Date(expense.expense_date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
};

export const getCategoryStats = (expenses: any[]) => {
  const categoryMap = new Map<string, number>();

  expenses.forEach(expense => {
    const current = categoryMap.get(expense.category) || 0;
    categoryMap.set(expense.category, current + expense.amount);
  });

  return Array.from(categoryMap.entries()).map(([category, total]) => ({
    category,
    total,
  }));
};