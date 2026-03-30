import { Router } from "express";
import { expenseController } from "../controllers/expense.controller";
import {
  validateCreateExpense,
  validateUpdateExpense,
} from "../middlewares/validateExpense";

const router = Router();

router.get("/summary", expenseController.getExpenseSummary);
router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.post("/", validateCreateExpense, expenseController.createExpense);
router.put("/:id", validateUpdateExpense, expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

export default router;