import "dotenv/config";
import cors from "cors";
import express from "express";
// database connection
import database from "./database/connection.js";
import { insertParty } from "./utils/party.js";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FE_URL, credentials: true }));

async function syncDatabase() {
  try {
    await database.sync();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error creating database & tables:", error);
  }
}

syncDatabase();

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
