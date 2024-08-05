import express from "express";
const router = express.Router();
import {
  addPurchaseData,
  getAllPurchaseData,
  getPartyPurchaseData,
  deletePartyPurchaseData,
  getPartyOrderPurchaseData,
  getPartyCategoriesPurchaseChartData,
} from "../controller/purchase.controller.js";

// Add new purchase record data
router.post("/add", addPurchaseData);

// Get party-wise purchase data
router.get("/party-wise", getPartyPurchaseData);

// Get party-wise purchase data
router.post("/delete-purchase", deletePartyPurchaseData);

// Get party purchase order data
router.get("/party-order-details", getPartyOrderPurchaseData);

// Get party-wise purchase order chart data
router.get("/purchase-chart-data", getPartyCategoriesPurchaseChartData);

// Get all purchase data
router.get("/all", getAllPurchaseData);

export default router;
