import "dotenv/config";
import cors from "cors";
import express from "express";
// database connection
import database from "./database/connection.js";
// import { insertParty } from "./utils/party.js";
import Purchase from "./models/purchase.model.js";
import Party from "./models/party.model.js";
import Expense from "./models/expense.model.js";
import Stock from "./models/stock.model.js";
import Sales from "./models/sales.model.js";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FE_URL, credentials: true }));

async function syncDatabase() {
  try {
    await database.sync();

    // // Insert a new party
    // const party = await Party.create({ party_name: "Example Party" });
    // console.log("New Party Created:", party.toJSON());

    // // Insert a new purchase
    // const purchase = await Purchase.create({
    //   purchase_date: new Date(),
    //   product: "Example Product",
    //   product_type: "Example Type",
    //   company: "Example Company",
    //   party_id: party.party_id,
    //   //   party_name: party.party_name, // FK referencing Party
    //   quantity: 10,
    //   weight: "10kg",
    //   amount: 100,
    // });

    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error creating database & tables:", error);
  }
}

syncDatabase();

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
