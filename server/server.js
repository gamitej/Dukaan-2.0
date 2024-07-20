import "dotenv/config";
import cors from "cors";
import express from "express";
// database connection
import database from "./database/connection.js";
// import { insertParty } from "./utils/party.js";
// import Product from "./models/product.model.js";
// import Purchase from "./models/purchase.model.js";
// import Party from "./models/party.model.js";
// import Expense from "./models/expense.model.js";
// import Stock from "./models/stock.model.js";
// import Sales from "./models/sales.model.js";
// import Identity from "./models/identity.model.js";
import PartyRoute from "./routes/party.route.js";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FE_URL, credentials: true }));

async function syncDatabase() {
  try {
    await database.sync();
  } catch (error) {
    console.error("Error creating database & tables:", error);
  }
}

syncDatabase();

app.use("/api/party", PartyRoute);

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
