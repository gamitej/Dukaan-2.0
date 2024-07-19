import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";

const Party = sequelize.define("Party", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => generateUUID(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Party;
