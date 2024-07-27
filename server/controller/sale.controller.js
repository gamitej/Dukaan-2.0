import sequelize from "../database/connection.js";
// models
import Sales from "../models/sales.model.js";
import Stock from "../models/stock.model.js";
import Product from "../models/product.model.js";
import { ProductExistsByCategory } from "./product.controller.js";

export const GetProductSaleDetails = async (req, res) => {
  try {
    const { party_id } = req.query;

    if (!party_id) {
      return res.status(400).json("Missing party_id parameter");
    }

    // Fetch purchase data based on party_id
    const sales = await Sales.findAll({
      where: {
        party_id: party_id,
      },
      order: [["date", "DESC"]],
      include: [
        {
          model: Product,
          attributes: ["product", "company", "category"],
        },
      ],
    });

    if (sales.length === 0) return res.status(200).json([]);

    const formattedSalesData = sales.map((item) => {
      const {
        id,
        Product: { product, company, category },
        date,
        quantity,
        weight,
        price,
        product_id,
      } = item;
      return {
        id: id,
        date: date,
        product,
        company,
        category,
        quantity,
        weight,
        price,
        product_id,
      };
    });

    return res.status(200).json(formattedSalesData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const AddProductSale = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const requestData = req.body;

    // Step 1: Check if product exists
    const result = await ProductExistsByCategory(req.body);

    if (result.isError) throw new Error(result.error);

    if (!result.prod_id) throw new Error("Product id not found!");

    // Step 2: Add a new in sale table
    const sale = await Sales.create(
      {
        product_id: result.prod_id,
        ...requestData,
      },
      { transaction }
    );

    if (!sale) throw new Error("Something went wrong in the sale table!");

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
      await stock.update(
        { quantity: currentQuantity + quantity_in_num },
        { transaction }
      );
    } else {
      // Insert new stock table
      await Stock.create(
        { product_id: result.prod_id, quantity: quantity_in_num },
        { transaction }
      );
    }

    // Step 5: Commit the transaction
    await transaction.commit();

    return res.status(200).json("Sale record added successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};

export const DeleteProductSale = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const requestData = req.body;

    // Step 1: Delete from sales table
    const saleDelete = await Sales.destroy(
      { where: { id: requestData.id } },
      { transaction }
    );

    if (!saleDelete) throw new Error("Sale product not found!");

    // Step 2: Delete sale product quantity from stock table
    const stock = await Stock.findOne({
      where: { product_id: requestData.product_id },
      transaction,
    });

    const { quantity } = requestData;
    const quantity_in_num = parseInt(quantity);

    if (stock) {
      const currentQuantity = parseInt(stock.quantity) || 0;

      // Update existing stock
      await stock.update(
        { quantity: currentQuantity - quantity_in_num },
        { transaction }
      );
    } else {
      throw new Error("Sale product not found in stock!");
    }

    // Step 3: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Sale product record deleted successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};
