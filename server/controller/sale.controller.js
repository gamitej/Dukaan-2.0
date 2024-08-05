import sequelize from "../database/connection.js";
// models
import Sales from "../models/sales.model.js";
import Stock from "../models/stock.model.js";
import Product from "../models/product.model.js";
import { ProductExistsByCategory } from "./product.controller.js";
import { DateCondition } from "../utils/date.js";
import { getAvgPrice } from "../utils/math.js";

export const GetProductSaleDetails = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate) return res.status(400).json("Missing start date parameter");
    if (!endDate) return res.status(400).json("Missing end date parameter");

    const dateCondition = DateCondition({ ...req.query, date_label: "date" });

    // Fetch purchase data based on party_id
    const sales = await Sales.findAll({
      where: { ...dateCondition },
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
        avg_price: Math.ceil(parseInt(price) / parseInt(quantity)),
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

    if (!stock) throw new Error("Product not found in stock!");

    const { quantity } = req.body;
    const quantity_in_num = parseInt(quantity);
    const currentQuantity = parseInt(stock.quantity) || 0;

    if (quantity_in_num === 0)
      throw new Error("Quantity must be greater than zero");

    if (currentQuantity < quantity_in_num)
      throw new Error("Product quantity is out of range");

    // Step 4: Update existing stock
    stock.quantity = currentQuantity - quantity_in_num;
    const stockUpdated = await stock.save({ transaction });
    if (!stockUpdated) throw new Error("Error while updating stock!");

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
    const saleDelete = await Sales.destroy({
      where: { id: requestData.id },
      transaction,
    });

    if (!saleDelete) throw new Error("Sale product not found!");

    // Step 2: Delete sale product quantity from stock table
    const stock = await Stock.findOne({
      where: { product_id: requestData.product_id },
      transaction,
    });

    if (!stock) throw new Error("Product not found in stock table");

    const { quantity } = requestData;
    const quantity_in_num = parseInt(quantity);

    const currentQuantity = parseInt(stock.quantity) || 0;

    // Step 3: Update existing stock
    stock.quantity = currentQuantity + quantity_in_num;
    const stockUpdated = await stock.save({ transaction });
    if (!stockUpdated)
      throw new Error("Something went wrong while updation stock!");

    // Step 4: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Sale product record deleted successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};

export const GetSalesOverview = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate) return res.status(400).json("Missing start date parameter");
    if (!endDate) return res.status(400).json("Missing end date parameter");

    const dateCondition = DateCondition({ ...req.query, date_label: "date" });

    const results = await Sales.findAll({
      attributes: [
        "product_id",
        [sequelize.fn("SUM", sequelize.col("price")), "total_sales"],
        [sequelize.fn("SUM", sequelize.col("quantity")), "total_quantity"],
      ],
      where: {
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
      total_sales: parseInt(result.getDataValue("total_sales")),
      total_quantity: parseInt(result.getDataValue("total_quantity")),
      avg_sale: getAvgPrice(
        parseInt(result.getDataValue("total_sales")),
        parseInt(result.getDataValue("total_quantity"))
      ),
    }));

    return res.status(200).json(formattedResults);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};
