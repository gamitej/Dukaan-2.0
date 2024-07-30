import Expense from "../models/expense.model.js";
import { DateCondition } from "../utils/date.js";

export const GetExpensesDetails = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate) return res.status(400).json("Missing start date parameter");
    if (!endDate) return res.status(400).json("Missing end date parameter");

    const dateCondition = DateCondition({
      ...req.query,
      date_label: "date",
    });

    const expenseData = await Expense.findAll({
      where: { ...dateCondition },
      order: [["date", "DESC"]],
    });

    if (expenseData.length === 0) return res.status(200).json([]);

    return res.status(200).json(expenseData);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const AddExpense = async (req, res) => {
  try {
    const requestData = req.body;

    const expenseData = await Expense.create({
      ...requestData,
    });

    if (!expenseData)
      throw new Error("Something went wrong in the expense table!");
    return res.status(200).json("Expense record added successfully!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const DeleteExpense = async (req, res) => {
  try {
    const requestData = req.body;

    // Step 1: Delete from return table
    const expenseDelete = await Expense.destroy({
      where: { id: requestData.id },
      transaction,
    });

    if (!expenseDelete) throw new Error("Expense id not found!");
    return res.status(200).json("Expense record deleted successfully!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};
