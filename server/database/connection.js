import "dotenv/config";
import { Sequelize } from "sequelize";

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DAILECT || "mysql",
    logging: false,
  }
);

export default sequelize;
