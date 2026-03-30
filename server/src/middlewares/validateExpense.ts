import { Request, Response, NextFunction } from "express";

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const validateCreateExpense = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, amount, category, expenseDate, receiptUrl } = req.body;

  if (!title || typeof title !== "string" || title.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Title is required and must be at least 2 characters long",
    });
  }

  if (amount === undefined || amount === null || isNaN(Number(amount)) || Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount is required and must be greater than 0",
    });
  }

  if (!category || typeof category !== "string" || category.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Category is required and must be at least 2 characters long",
    });
  }

  if (!expenseDate || isNaN(Date.parse(expenseDate))) {
    return res.status(400).json({
      success: false,
      message: "A valid expense date is required",
    });
  }

  if (receiptUrl && !isValidUrl(receiptUrl)) {
    return res.status(400).json({
      success: false,
      message: "Receipt URL must be a valid URL",
    });
  }

  next();
};

export const validateUpdateExpense = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, amount, category, expenseDate, receiptUrl } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 2 characters long",
      });
    }
  }

  if (amount !== undefined) {
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Category must be at least 2 characters long",
      });
    }
  }

  if (expenseDate !== undefined) {
    if (isNaN(Date.parse(expenseDate))) {
      return res.status(400).json({
        success: false,
        message: "Expense date must be valid",
      });
    }
  }

  if (receiptUrl !== undefined && receiptUrl !== null && receiptUrl !== "") {
    if (typeof receiptUrl !== "string" || !isValidUrl(receiptUrl)) {
      return res.status(400).json({
        success: false,
        message: "Receipt URL must be a valid URL",
      });
    }
  }

  next();
};