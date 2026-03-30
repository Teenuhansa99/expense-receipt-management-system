import { expenseRepository } from "../repositories/expense.repository";
import { CreateExpenseInput, UpdateExpenseInput } from "../models/expense.types";
import { ApiError } from "../utils/apiError";

export const expenseService = {
  async createExpense(data: CreateExpenseInput) {
    return await expenseRepository.create(data);
  },

  async getAllExpenses(filters: {
    search?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return await expenseRepository.findAll(filters);
  },

  async getExpenseById(id: number) {
    const expense = await expenseRepository.findById(id);

    if (!expense) {
      throw new ApiError(404, "Expense not found");
    }

    return expense;
  },

  async updateExpense(id: number, data: UpdateExpenseInput) {
    const updatedExpense = await expenseRepository.update(id, data);

    if (!updatedExpense) {
      throw new ApiError(404, "Expense not found");
    }

    return updatedExpense;
  },

  async deleteExpense(id: number) {
    const deletedExpense = await expenseRepository.delete(id);

    if (!deletedExpense) {
      throw new ApiError(404, "Expense not found");
    }

    return deletedExpense;
  },

  async getExpenseSummary() {
    return await expenseRepository.getSummary();
  },
};