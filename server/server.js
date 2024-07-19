import cors from "cors";
import express from "express";
// database connection
import database from "./database/connection.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
