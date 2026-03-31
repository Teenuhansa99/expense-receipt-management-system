import { Router } from "express";
import { expenseController } from "../controllers/expense.controller";
import {
  validateCreateExpense,
  validateUpdateExpense,
} from "../middlewares/validateExpense";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// All expense routes require authentication
router.get("/summary", protect, expenseController.getExpenseSummary);
router.get("/", protect, expenseController.getAllExpenses);
router.get("/:id", protect, expenseController.getExpenseById);
router.post("/", protect, validateCreateExpense, expenseController.createExpense);
router.put("/:id", protect, validateUpdateExpense, expenseController.updateExpense);
router.delete("/:id", protect, expenseController.deleteExpense);

export default router;