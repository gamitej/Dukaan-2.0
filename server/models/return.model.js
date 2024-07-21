import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";
// models
import Party from "../models/party.model.js";
import Purchase from "../models/purchase.model.js";

const Return = sequelize.define("Return", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => generateUUID(),
  },
  party_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Party,
      key: "party_id",
    },
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Purchase,
      key: "order_id",
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Purchase.hasMany(Return, { foreignKey: "order_id" });

Return.belongsTo(Purchase, { foreignKey: "order_id" });

Party.hasMany(Return, { foreignKey: "party_id" });

Return.belongsTo(Party, { foreignKey: "party_id" });

export default Return;
