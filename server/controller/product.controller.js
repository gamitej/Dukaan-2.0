import { Op } from "sequelize";
import Product from "../models/product.model.js";
import Sequelize from "../database/connection.js";

export const addProductDetails = async (req, res) => {
  try {
    const { company, category, product } = req.body;

    // Check if a record with the same product , company and category exists
    const existingProduct = await Product.findOne({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("company")),
            company.toLowerCase()
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("category")),
            category.toLowerCase()
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("product")),
            product.toLowerCase()
          ),
        ],
      },
    });

    if (existingProduct) {
      return res.status(409).json("Already exists!");
    }

    // Create new product record
    const newProduct = await Product.create({
      company: company,
      category: category,
      product: product,
    });

    if (newProduct) {
      return res.status(200).json("Added new products!");
    }

    return res.status(400).json("Something went wrong!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const getAllProductsDetails = async (req, res) => {
  try {
    // Fetch all product details and group by category
    const products = await Product.findAll({
      attributes: [
        "category",
        [Sequelize.fn("GROUP_CONCAT", Sequelize.col("product")), "products"],
        [Sequelize.fn("GROUP_CONCAT", Sequelize.col("company")), "companies"],
      ],
      group: ["category"],
      order: [["category", "ASC"]],
    });

    // Format the results
    const formattedProducts = products.map((product) => ({
      category: product.category,
      products: product.get("products").split(","),
      companies: product.get("companies").split(","),
    }));

    return res.status(200).json(formattedProducts);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};
