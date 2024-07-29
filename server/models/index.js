import database from "../database/connection.js";
import Product from "./product.model.js";
import Payment from "./payment.model.js";
import Purchase from "./purchase.model.js";
import Party from "./party.model.js";
import Expense from "./expense.model.js";
import Stock from "./stock.model.js";
import Sales from "./sales.model.js";
import Return from "./return.model.js";
import Identity from "./identity.model.js";
import PendingPayment from "./pendingPayment.model.js";

const syncDatabase = async () => {
  try {
    await database.sync();
  } catch (error) {
    console.error("Error creating database & tables:", error);
  }
};

export {
  syncDatabase,
  Product,
  Payment,
  Purchase,
  Party,
  Expense,
  Stock,
  Sales,
  Return,
  Identity,
  PendingPayment,
};
