import "dotenv/config";
import cors from "cors";
import express from "express";
// database connection
import { syncDatabase } from "./models/index.js";
// routes
import routes from "./routes/index.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FE_URL, credentials: true }));

if (process.env.NODE_ENV !== "test") {
  syncDatabase();
}

app.use("/api", routes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
  });
}

export default app;
