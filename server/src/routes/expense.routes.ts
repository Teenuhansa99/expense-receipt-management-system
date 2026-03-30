import { Router } from "express";
import { expenseController } from "../controllers/expense.controller";
import {
  validateCreateExpense,
  validateUpdateExpense,
} from "../middlewares/validateExpense";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/summary", expenseController.getExpenseSummary);
router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.post("/", protect, validateCreateExpense, expenseController.createExpense);
router.put("/:id", protect, validateUpdateExpense, expenseController.updateExpense);
router.delete("/:id", protect, expenseController.deleteExpense);

export default router;