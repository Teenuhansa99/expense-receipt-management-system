import { expenseRepository } from "../repositories/expense.repository";
import { CreateExpenseInput, UpdateExpenseInput } from "../models/expense.types";
import { ApiError } from "../utils/apiError";

export const expenseService = {
  async createExpense(data: CreateExpenseInput, userId: number) {
    return await expenseRepository.create(data, userId);
  },

  async getAllExpenses(
    userId: number,
    filters: {
      search?: string;
      category?: string;
      startDate?: string;
      endDate?: string;
    }
  ) {
    return await expenseRepository.findAll(userId, filters);
  },

  async getExpenseById(id: number, userId: number) {
    const expense = await expenseRepository.findById(id, userId);

    if (!expense) {
      throw new ApiError(404, "Expense not found");
    }

    return expense;
  },

  async updateExpense(id: number, userId: number, data: UpdateExpenseInput) {
    const updatedExpense = await expenseRepository.update(id, userId, data);

    if (!updatedExpense) {
      throw new ApiError(404, "Expense not found");
    }

    return updatedExpense;
  },

  async deleteExpense(id: number, userId: number) {
    const deletedExpense = await expenseRepository.delete(id, userId);

    if (!deletedExpense) {
      throw new ApiError(404, "Expense not found");
    }

    return deletedExpense;
  },

  async getExpenseSummary(userId: number) {
    return await expenseRepository.getSummary(userId);
  },
};