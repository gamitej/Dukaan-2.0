import sequelize from "../database/connection.js";
// models
import Stock from "../models/stock.model.js";
import Product from "../models/product.model.js";
import Purchase from "../models/purchase.model.js";
// controllers
import { ProductExistsByCategory } from "./product.controller.js";
import {
  PurchaseToPendingPayment,
  DeletePurchaseFromPendingPayment,
} from "./pendingPayment.controller.js";
import { DateCondition } from "../utils/date.js";
import { getAvgPrice } from "../utils/math.js";

export const addPurchaseData = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const requestData = req.body;

    // Step 1: Check if product exists
    const result = await ProductExistsByCategory(req.body);

    if (result.isError) throw new Error(result.error);

    if (!result.prod_id) throw new Error("Product id not found!");

    // Step 2: Retrieve order_id from PendingPayment
    const { data } = await PurchaseToPendingPayment(requestData, transaction);

    // Step 3: Add a new in purchase table
    const purchaseCreated = await Purchase.create(
      {
        ...requestData,
        order_id: data,
        product_id: result.prod_id,
        purchase_date: requestData.date,
      },
      { transaction }
    );

    if (!purchaseCreated) throw new Error("Error while creating purchase!");

    // Step 4: Update or insert in stock table
    const stock = await Stock.findOne({
      where: { product_id: result.prod_id },
      transaction,
    });

    const { quantity } = req.body;
    const quantity_in_num = parseInt(quantity);

    if (stock) {
      const currentQuantity = parseInt(stock.quantity) || 0;
      // Update existing stock
      stock.quantity = currentQuantity + quantity_in_num;
      const stockUpdated = await stock.save({ transaction });

      if (!stockUpdated) throw new Error("Error while updating product stock!");
    } else {
      // Insert new stock table
      const stockCreated = await Stock.create(
        { product_id: result.prod_id, quantity: quantity_in_num },
        { transaction }
      );
      if (!stockCreated) throw new Error("Error while creating product stock!");
    }

    // Step 5: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Purchase record added successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};

export const getPartyPurchaseData = async (req, res) => {
  try {
    const { party_id, startDate, endDate } = req.query;

    if (!party_id) return res.status(400).json("Missing party_id parameter");
    if (!startDate) return res.status(400).json("Missing start date parameter");
    if (!endDate) return res.status(400).json("Missing end date parameter");

    const dateCondition = DateCondition(req.query);

    // Fetch purchase data and calculate the total price
    const purchases = await Purchase.findAll({
      where: {
        party_id: party_id,
        ...dateCondition,
      },
      order: [
        ["purchase_date", "DESC"],
        ["order_id", "ASC"],
      ],
      include: [
        {
          model: Product,
          attributes: ["product", "company", "category"],
        },
      ],
    });

    if (purchases.length === 0) return res.status(200).json({ purchases: [] });

    const formattedPurchase = purchases.map((item) => {
      const {
        purchase_id,
        Product: { product, company, category },
        purchase_date,
        quantity,
        weight,
        order_id,
        price,
        product_id,
      } = item;
      return {
        id: purchase_id,
        date: purchase_date,
        product,
        company,
        category,
        quantity,
        weight,
        order_id,
        price,
        avg_price: parseInt(parseInt(price) / parseInt(quantity)),
        product_id,
      };
    });

    return res.status(200).json({ purchases: formattedPurchase });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const deletePartyPurchaseData = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const requestData = req.body;

    // Step 1: Delete from purchase table
    const purchaseDelete = await Purchase.destroy({
      where: { purchase_id: requestData.purchase_id },
      transaction,
    });

    if (!purchaseDelete) throw new Error("Purchase product not found!");

    // Step 2: Remove order_id price from PendingPayment table
    await DeletePurchaseFromPendingPayment(requestData, transaction);

    // Step 3: Delete purchase product quantity from stock table
    const stock = await Stock.findOne({
      where: { product_id: requestData.product_id },
      transaction,
    });

    if (!stock) throw new Error("Product not found in stock!");

    const { quantity } = requestData;
    const quantity_in_num = parseInt(quantity);
    const currentQuantity = parseInt(stock.quantity) || 0;

    if (currentQuantity < quantity_in_num)
      throw new Error("Product quantity is out of range");

    // Step 4: Update existing stock
    stock.quantity = currentQuantity - quantity_in_num;
    const stockUpdated = await stock.save({ transaction });

    if (!stockUpdated) throw new Error("Error while updating product stock!");

    // Step 5: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Purchase record deleted successfully!");
  } catch (error) {
    console.error("Transaction Error:", error); // Debugging
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};

export const getPartyOrderPurchaseData = async (req, res) => {
  try {
    const { party_id, order_id } = req.query;

    if (!party_id) return res.status(409).json("Party ID is required");
    if (!order_id) return res.status(409).json("Order ID is required");

    // Fetch party purchase order data based on order_id & party_id
    const purchases = await Purchase.findAll({
      where: {
        party_id: party_id,
        order_id: order_id,
      },
      order: [
        ["purchase_date", "DESC"],
        ["order_id", "ASC"],
      ],
      include: [
        {
          model: Product,
          attributes: ["product", "company", "category"],
        },
      ],
    });

    if (purchases.length === 0) return res.status(200).json([]);

    const formattedPurchase = purchases.map((item) => {
      const {
        purchase_id,
        Product: { product, company, category },
        purchase_date,
        quantity,
        weight,
        order_id,
        price,
        product_id,
      } = item;
      return {
        id: purchase_id,
        date: purchase_date,
        product,
        company,
        category,
        quantity,
        weight,
        order_id,
        price,
        product_id,
      };
    });

    return res.status(200).json(formattedPurchase);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const getPartyCategoriesPurchaseChartData = async (req, res) => {
  try {
    const { party_id, startDate, endDate } = req.query;

    if (!party_id) return res.status(400).json("Missing party_id parameter");
    if (!startDate) return res.status(400).json("Missing start date parameter");
    if (!endDate) return res.status(400).json("Missing end date parameter");

    const dateCondition = DateCondition(req.query);

    const results = await Purchase.findAll({
      attributes: [
        "product_id",
        [sequelize.fn("SUM", sequelize.col("price")), "total_purchase"],
        [sequelize.fn("SUM", sequelize.col("quantity")), "total_quantity"],
      ],
      where: {
        party_id,
        ...dateCondition,
      },
      group: ["product_id"],
      include: {
        model: Product,
        attributes: ["product", "category", "company"],
      },
    });

    const formattedResults = results.map((result) => ({
      product: result.Product.product,
      company: result.Product.company,
      category: result.Product.category,
      total_purchase: parseInt(result.getDataValue("total_purchase")),
      total_quantity: parseInt(result.getDataValue("total_quantity")),
      avg_purchase: getAvgPrice(
        parseInt(result.getDataValue("total_purchase")),
        parseInt(result.getDataValue("total_quantity"))
      ),
    }));

    return res.status(200).json(formattedResults);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};
