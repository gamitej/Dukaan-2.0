import Stock from "../models/stock.model.js";
import Return from "../models/return.model.js";
import Product from "../models/product.model.js";
// controllers
import { ProductExistsByCategory } from "./product.controller.js";
import { DateCondition } from "../utils/date.js";
import sequelize from "../database/connection.js";

export const GetPartyReturnDetails = async (req, res) => {
  try {
    const { party_id, startDate, endDate } = req.query;

    if (!party_id) return res.status(400).json("Missing party_id parameter");
    if (!startDate) return res.status(400).json("Missing start date parameter");
    if (!endDate) return res.status(400).json("Missing end date parameter");

    const dateCondition = DateCondition({
      ...req.query,
      date_label: "return_date",
    });

    // Fetch purchase data based on party_id
    const returnData = await Return.findAll({
      where: {
        party_id: party_id,
        ...dateCondition,
      },
      order: [["return_date", "DESC"]],
      include: [
        {
          model: Product,
          attributes: ["product", "company", "category"],
        },
      ],
    });

    if (returnData.length === 0) return res.status(200).json([]);

    const formattedReturnData = returnData.map((item) => {
      const {
        id,
        Product: { product, company, category },
        return_date: date,
        quantity,
        amount,
        product_id,
        order_id,
      } = item;
      return {
        id: id,
        date,
        order_id,
        product,
        company,
        category,
        quantity,
        price: amount,
        product_id,
      };
    });

    return res.status(200).json(formattedReturnData);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const AddPartyReturnData = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const requestData = req.body;

    // Step 1: Check if product exists
    const result = await ProductExistsByCategory(req.body);

    if (result.isError) throw new Error(result.error);

    if (!result.prod_id) throw new Error("Product id not found!");

    // Step 2: Add a new in return table
    const returnData = await Return.create(
      {
        product_id: result.prod_id,
        return_date: requestData.date,
        order_id: requestData.orderId,
        amount: parseInt(requestData.price),
        ...requestData,
      },
      { transaction }
    );

    if (!returnData)
      throw new Error("Something went wrong in the return table!");

    // Step 4: Update or insert in stock table
    const stock = await Stock.findOne({
      where: { product_id: result.prod_id },
      transaction,
    });

    if (!stock) throw new Error("Product not found in stock table!");

    const quantity_in_num = parseInt(requestData.quantity);
    const currentQuantity = parseInt(stock.quantity) || 0;
    if (currentQuantity < quantity_in_num)
      throw new Error("Product quantity is out of range");
    // Update existing stock
    const stockUpdated = await stock.update(
      { quantity: currentQuantity - quantity_in_num },
      { transaction }
    );

    if (!stockUpdated) throw new Error("Error while updating product stock!");

    // Step 5: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Return record added successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};

export const DeletePartyReturnData = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const requestData = req.body;

    // Step 1: Delete from return table
    const returnDelete = await Return.destroy({
      where: { id: requestData.id },
      transaction,
    });

    if (!returnDelete) throw new Error("Return product id not found!");

    // Step 4: Update or insert in stock table
    const stock = await Stock.findOne({
      where: { product_id: requestData.product_id },
      transaction,
    });

    if (!stock) throw new Error("Product not found in stock table!");

    const quantity_in_num = parseInt(requestData.quantity);
    const currentQuantity = parseInt(stock.quantity) || 0;
    // Update existing stock
    const stockUpdated = await stock.update(
      { quantity: currentQuantity + quantity_in_num },
      { transaction }
    );

    if (!stockUpdated) throw new Error("Error while updating product stock!");

    // Step 5: Commit the transaction
    await transaction.commit();

    return res.status(200).json("Return record deleted successfully!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};
