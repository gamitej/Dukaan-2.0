import express from "express";
const router = express.Router();
import {
  addPurchaseData,
  getPartyPurchaseData,
} from "../controller/purchase.controller.js";

// Add new purchase record data
router.post("/add-purchase", addPurchaseData);

// Get party-wise purchase data
router.get("/party-purchase", getPartyPurchaseData);

export default router;
