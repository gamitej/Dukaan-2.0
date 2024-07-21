import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";
// models
import Party from "./party.model.js";

const PendingPayment = sequelize.define("PendingPayment", {
  purchase_id: {
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
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paid_amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

Party.hasMany(PendingPayment, { foreignKey: "party_id" });
PendingPayment.belongsTo(Party, { foreignKey: "party_id" });

export default PendingPayment;
