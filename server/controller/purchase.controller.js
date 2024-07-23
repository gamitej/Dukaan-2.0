import sequelize from "../database/connection.js";
// models
import Stock from "../models/stock.model.js";
import Purchase from "../models/purchase.model.js";
// controllers
import { PurchaseToPendingPayment } from "./pendingPayment.controller";
import { ProductExistsByCategory } from "./product.controller.js";

export const addPurchaseData = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const requestData = req.body;

    // Step 1: Check if product exists
    const result = await ProductExistsByCategory(req.body);

    if (result.isError) {
      return res.status(500).json(result.error);
    }

    if (!result.prod_id) {
      return res.status(404).json("Product id not found!");
    }

    // Step 2: Retrieve order_id from PendingPayment
    const { data, isError } = PurchaseToPendingPayment(
      requestData,
      transaction
    );

    if (isError)
      return res
        .status(400)
        .json({ error: data, message: "Something went wrong" });

    // Step 3: Add a new purchase record
    await Purchase.create(
      {
        ...requestData,
        order_id: data,
        product_id: result.prod_id,
        purchase_date: requestData.date,
      },
      { transaction }
    );

    // Step 4: Update or insert stock record
    const stock = await Stock.findOne({
      where: { product_id },
      transaction,
    });

    if (stock) {
      // Update existing stock
      await stock.update(
        { quantity: stock.quantity + quantity },
        { transaction }
      );
    } else {
      // Insert new stock record
      await Stock.create({ product_id, quantity }, { transaction });
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
    const { party_id } = req.query;

    if (!party_id) {
      return res.status(400).json("Missing party_id parameter");
    }

    // Fetch purchase data based on party_id
    const purchases = await Purchase.findAll({
      where: {
        party_id: party_id,
      },
      order: [
        ["purchase_date", "DESC"],
        ["order_id", "ASC"],
      ],
    });

    if (purchases.length === 0) {
      return res.status(404).json("No purchases found for this party_id");
    }

    return res.status(200).json(purchases);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};
