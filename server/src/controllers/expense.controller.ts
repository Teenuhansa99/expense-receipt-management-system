import { Request, Response, NextFunction } from "express";
import { expenseService } from "../services/expense.service";
import { JwtPayload } from "../models/user.types";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const expenseController = {
  async createExpense(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const newExpense = await expenseService.createExpense(req.body, userId);

      res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: newExpense,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAllExpenses(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const { search, category, startDate, endDate } = req.query;

      const expenses = await expenseService.getAllExpenses(userId, {
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

  async getExpenseById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const id = Number(req.params.id);
      const expense = await expenseService.getExpenseById(id, userId);

      res.status(200).json({
        success: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateExpense(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const id = Number(req.params.id);
      const updatedExpense = await expenseService.updateExpense(id, userId, req.body);

      res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: updatedExpense,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteExpense(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const id = Number(req.params.id);
      const deletedExpense = await expenseService.deleteExpense(id, userId);

      res.status(200).json({
        success: true,
        message: "Expense deleted successfully",
        data: deletedExpense,
      });
    } catch (error) {
      next(error);
    }
  },

  async getExpenseSummary(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const summary = await expenseService.getExpenseSummary(userId);

      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  },
};