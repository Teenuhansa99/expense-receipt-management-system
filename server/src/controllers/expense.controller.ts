import { Request, Response, NextFunction } from "express";
import { expenseService } from "../services/expense.service";

export const expenseController = {
  async createExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const newExpense = await expenseService.createExpense(req.body);

      res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: newExpense,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAllExpenses(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, category, startDate, endDate } = req.query;

      const expenses = await expenseService.getAllExpenses({
        search: search as string,
        category: category as string,
        startDate: startDate as string,
        endDate: endDate as string,
      });

      res.status(200).json({
        success: true,
        data: expenses,
      });
    } catch (error) {
      next(error);
    }
  },

  async getExpenseById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const expense = await expenseService.getExpenseById(id);

      res.status(200).json({
        success: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const updatedExpense = await expenseService.updateExpense(id, req.body);

      res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: updatedExpense,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deletedExpense = await expenseService.deleteExpense(id);

      res.status(200).json({
        success: true,
        message: "Expense deleted successfully",
        data: deletedExpense,
      });
    } catch (error) {
      next(error);
    }
  },

  async getExpenseSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await expenseService.getExpenseSummary();

      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  },
};