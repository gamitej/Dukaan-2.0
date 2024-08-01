import { Op, fn, col, literal } from "sequelize";
import { getAvgPrice } from "../utils/math.js";
import Sales from "../models/sales.model.js";
import Expense from "../models/expense.model.js";
import Product from "../models/product.model.js";
import Purchase from "../models/purchase.model.js";
import PendingPayment from "../models/pendingPayment.model.js";

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
      { label: "Income", value: totalSales - totalPurchase - totalExpenses },
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
    // Define date range
    const endDate = new Date(); // Current date
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 5); // 6 months ago including the current month

    // Create a list of the last 6 months
    const months = [];
    const cate = [];
    for (let i = 0; i <= 5; i++) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);
      // getMonth() is zero-based
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const monthKey = `${year}-${month < 10 ? "0" + month : month}`;
      const readableMonth = `${month < 10 ? "0" + month : month}-${year}`;
      months.push(monthKey);
      cate.push(readableMonth);
    }

    // Initialize series with zeros
    const series = {
      NetProfit: Array(6).fill(0),
      Purchase: Array(6).fill(0),
      Sale: Array(6).fill(0),
      Expenses: Array(6).fill(0),
    };

    // Fetch monthly data
    const purchases = await Purchase.findAll({
      attributes: [
        [fn("MONTH", col("purchase_date")), "month"],
        [fn("YEAR", col("purchase_date")), "year"],
        [fn("SUM", col("price")), "totalPurchase"],
      ],
      where: {
        purchase_date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ["year", "month"],
      order: [
        ["year", "ASC"],
        ["month", "ASC"],
      ],
    });

    const sales = await Sales.findAll({
      attributes: [
        [fn("MONTH", col("date")), "month"],
        [fn("YEAR", col("date")), "year"],
        [fn("SUM", col("price")), "totalSales"],
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ["year", "month"],
      order: [
        ["year", "ASC"],
        ["month", "ASC"],
      ],
    });

    const expenses = await Expense.findAll({
      attributes: [
        [fn("MONTH", col("date")), "month"],
        [fn("YEAR", col("date")), "year"],
        [fn("SUM", col("amount")), "totalExpenses"],
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ["year", "month"],
      order: [
        ["year", "ASC"],
        ["month", "ASC"],
      ],
    });

    // Process results into series format
    purchases.forEach((purchase) => {
      const month = purchase.get("month");
      const year = purchase.get("year");
      const key = `${year}-${month < 10 ? "0" + month : month}`;
      const index = months.indexOf(key);
      if (index !== -1) {
        series.Purchase[index] = parseFloat(purchase.get("totalPurchase")) || 0;
      }
    });

    sales.forEach((sale) => {
      const month = sale.get("month");
      const year = sale.get("year");
      const key = `${year}-${month < 10 ? "0" + month : month}`;
      const index = months.indexOf(key);
      if (index !== -1) {
        series.Sale[index] = parseFloat(sale.get("totalSales")) || 0;
      }
    });

    expenses.forEach((expense) => {
      const month = expense.get("month");
      const year = expense.get("year");
      const key = `${year}-${month < 10 ? "0" + month : month}`;
      const index = months.indexOf(key);
      if (index !== -1) {
        series.Expenses[index] = parseFloat(expense.get("totalExpenses")) || 0;
      }
    });

    // Generate Net Profit
    series.NetProfit = series.Sale.map((sale, index) => {
      return (
        sale - (series.Purchase[index] || 0) - (series.Expenses[index] || 0)
      );
    });

    return res.status(200).json({
      cate,
      series,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const getCategoryWiseOverview = async (req, res) => {
  try {
    // Fetch purchase data
    const purchaseResults = await Purchase.findAll({
      attributes: [
        [col("Product.category"), "category"],
        [fn("SUM", col("price")), "totalPurchase"],
        [fn("SUM", col("quantity")), "purchaseQuantity"],
        [fn("AVG", col("price")), "avgPurchasePrice"],
      ],
      include: [
        {
          model: Product,
          attributes: [],
        },
      ],
      group: ["Product.category"],
      raw: true,
    });

    // Fetch sales data
    const salesResults = await Sales.findAll({
      attributes: [
        [col("Product.category"), "category"],
        [fn("SUM", col("price")), "totalSales"],
        [fn("SUM", col("quantity")), "soldQuantity"],
        [fn("AVG", col("price")), "avgSoldPrice"],
      ],
      include: [
        {
          model: Product,
          attributes: [],
        },
      ],
      group: ["Product.category"],
      raw: true,
    });

    // Combine and format results
    const aggregatedData = {};

    purchaseResults.forEach((result) => {
      const category = result.category;
      if (!aggregatedData[category]) {
        aggregatedData[category] = {
          category,
          totalPurchase: 0,
          purchaseQuantity: 0,
          avgPurchasePrice: 0,
          totalSales: 0,
          soldQuantity: 0,
          avgSoldPrice: 0,
          profit: 0,
        };
      }
      aggregatedData[category].totalPurchase += parseFloat(
        result.totalPurchase || 0
      );
      aggregatedData[category].purchaseQuantity += parseFloat(
        result.purchaseQuantity || 0
      );
      aggregatedData[category].avgPurchasePrice = parseFloat(
        result.avgPurchasePrice || 0
      );
    });

    salesResults.forEach((result) => {
      const category = result.category;
      if (!aggregatedData[category]) {
        aggregatedData[category] = {
          category,
          totalPurchase: 0,
          purchaseQuantity: 0,
          avgPurchasePrice: 0,
          totalSales: 0,
          soldQuantity: 0,
          avgSoldPrice: 0,
          profit: 0,
        };
      }
      aggregatedData[category].totalSales += parseFloat(result.totalSales || 0);
      aggregatedData[category].soldQuantity += parseFloat(
        result.soldQuantity || 0
      );
      aggregatedData[category].avgSoldPrice = parseFloat(
        result.avgSoldPrice || 0
      );
      aggregatedData[category].profit =
        parseFloat(aggregatedData[category].totalSales) -
        parseFloat(aggregatedData[category].totalPurchase);
    });

    const formattedData = Object.values(aggregatedData).map((item) => ({
      category: item.category,
      totalSold: item.totalSales,
      totalPurchase: item.totalPurchase,
      soldQuantity: item.soldQuantity,
      purchaseQuantity: item.purchaseQuantity,
      sold: `Rs ${item.totalSales.toFixed(1)}`,
      purchase: `Rs ${item.totalPurchase.toFixed(1)}`,
      quantity: `${item.soldQuantity} / ${item.purchaseQuantity}`,
      "avg-price": `Rs ${getAvgPrice(
        item.totalSales,
        item.soldQuantity
      )} / Rs ${getAvgPrice(item.totalPurchase, item.purchaseQuantity)}`,
      profit: `Rs ${item.profit.toFixed(1)}`,
    }));

    return res.status(200).json(formattedData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};
