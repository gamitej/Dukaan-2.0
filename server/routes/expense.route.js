import express from "express";
import {
  AddExpense,
  DeleteExpense,
  GetExpensesDetails,
} from "../controller/expense.controller.js";

const router = express.Router();

// Get expense details
router.get("/all", GetExpensesDetails);

// Add expense details
router.post("/add", AddExpense);

// Delete expense details
router.post("/delete", DeleteExpense);

export default router;
