import { fn, col, literal } from "sequelize";
import Sales from "../models/sales.model.js";
import Expense from "../models/expense.model.js";
import Product from "../models/product.model.js";
import Purchase from "../models/purchase.model.js";
import PendingPayment from "../models/pendingPayment.model.js";
import Identity from "../models/identity.model.js";
import { getAvgPrice } from "../utils/math.js";

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
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const getCategoryWiseOverview = async (req, res) => {
  try {
    const results = await Product.findAll({
      attributes: [
        "category",
        [fn("SUM", col("Purchases.price")), "totalPurchase"],
        [fn("SUM", col("Sales.price")), "totalSales"],
        [fn("SUM", col("Sales.quantity")), "soldQuantity"],
        [fn("SUM", col("Purchases.quantity")), "purchaseQuantity"],
        [fn("AVG", col("Sales.price")), "avgSoldPrice"],
        [fn("AVG", col("Purchases.price")), "avgPurchasePrice"],
        [literal("(SUM(Sales.price) - SUM(Purchases.price))"), "profit"],
      ],
      include: [
        {
          model: Purchase,
          attributes: [],
        },
        {
          model: Sales,
          attributes: [],
        },
      ],
      group: ["Product.product_id", "Product.category"],
    });

    // Aggregate results
    const aggregatedData = results.reduce((acc, result) => {
      const category = result.get("category");
      if (!acc[category]) {
        acc[category] = {
          category,
          sold: 0,
          purchase: 0,
          quantitySold: 0,
          quantityPurchased: 0,
          avgSoldPrice: 0,
          avgPurchasePrice: 0,
          profit: 0,
        };
      }

      acc[category].sold += parseFloat(result.get("totalSales") || 0);
      acc[category].purchase += parseFloat(result.get("totalPurchase") || 0);
      acc[category].quantitySold += parseFloat(result.get("soldQuantity") || 0);
      acc[category].quantityPurchased += parseFloat(
        result.get("purchaseQuantity") || 0
      );
      acc[category].avgSoldPrice += parseFloat(result.get("avgSoldPrice") || 0);
      acc[category].avgPurchasePrice += parseFloat(
        result.get("avgPurchasePrice") || 0
      );
      acc[category].profit += parseFloat(result.get("profit") || 0);

      return acc;
    }, {});

    // Format data
    const formattedData = Object.values(aggregatedData).map((item) => ({
      category: item.category,
      totalSold: item.sold,
      totalPurchase: item.purchase,
      soldQuantity: item.quantitySold,
      purchaseQuantity: item.quantityPurchased,
      sold: `Rs ${item.sold.toFixed(1)}`,
      purchase: `Rs ${item.purchase.toFixed(1)}`,
      quantity: `${item.quantitySold} / ${item.quantityPurchased}`,
      "avg-price": `Rs ${getAvgPrice(
        item.sold,
        item.quantitySold
      )} / Rs ${getAvgPrice(item.purchase, item.quantityPurchased)}`,
      profit: `Rs ${item.profit.toFixed(1)}`,
    }));

    return res.status(200).json(formattedData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};
