import express from "express";
import SaleRoute from "./sale.route.js";
import StockRoute from "./stock.route.js";
import PartyRoute from "./party.route.js";
import ReturnRoute from "./return.route.js";
import PaymentRoute from "./payment.route.js";
import ProductRoute from "./product.route.js";
import IdentityRoute from "./identity.route.js";
import PurchaseRoute from "./purchase.route.js";
import PendingPaymentRoute from "./pendingPayment.route.js";

const router = express.Router();

router.use("/sales", SaleRoute);
router.use("/party", PartyRoute);
router.use("/stocks", StockRoute);
router.use("/return", ReturnRoute);
router.use("/product", ProductRoute);
router.use("/payment", PaymentRoute);
router.use("/identity", IdentityRoute);
router.use("/purchase", PurchaseRoute);
router.use("/pending-payment", PendingPaymentRoute);

export default router;
