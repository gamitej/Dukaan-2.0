import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Product from "./product.model.js";

const Stock = sequelize.define("Stock", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => generateUUID(),
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.STRING,
    references: {
      model: Product,
      key: "product_id",
    },
  },
});

// Define associations
Product.hasOne(Stock, { foreignKey: "product_id" });
Stock.belongsTo(Product, { foreignKey: "product_id" });

export default Stock;
