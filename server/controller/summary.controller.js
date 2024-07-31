import { fn, col, literal } from "sequelize";
import PendingPayment from "../models/pendingPayment.model.js";
import Sales from "../models/sales.model.js";
import Expense from "../models/expense.model.js";

export const getOverallSummayOverview = async (req, res) => {
  try {
    const totalPurchaseResult = await PendingPayment.findOne({
      attributes: [[fn("SUM", col("total_amount")), "totalPurchase"]],
    });

    const totalSalesResult = await Sales.findOne({
      attributes: [[fn("SUM", col("price")), "totalSales"]],
    });

    const totalExpensesResult = await Expense.findOne({
      attributes: [[fn("SUM", col("amount")), "totalExpenses"]],
    });

    const totalPurchase = totalPurchaseResult?.get("totalPurchase") ?? 0;
    const totalSales = totalSalesResult?.get("totalSales") ?? 0;
    const totalExpenses = totalExpensesResult?.get("totalExpenses") ?? 0;

    const data = [
      { label: "Income", value: totalPurchase - totalSales - totalExpenses },
      { label: "Sales", value: totalSales },
      { label: "Purchase", value: totalPurchase },
      { label: "Expenses", value: totalExpenses },
    ];

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const getLastSixMonthOverview = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const getCategoryWiseOverview = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};
