import "dotenv/config";
import fs from "fs";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import express from "express";
import { fileURLToPath } from "url";
// database connection
import { syncDatabase } from "./models/index.js";
// routes
import routes from "./routes/index.js";

const PORT = process.env.PORT || 3001;
const app = express();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the log directory exists
const logDirectory = path.join(__dirname, "utils/accesslog");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory, { recursive: true });

// Create a write stream (in append mode) for access logs
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

// Setup the logger to log to file
app.use(morgan("combined", { stream: accessLogStream }));

// Also log to the console
app.use(morgan("dev"));

app.use(express.json());
app.use(cors({ origin: process.env.FE_URL, credentials: true }));

syncDatabase();

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

export default app;
