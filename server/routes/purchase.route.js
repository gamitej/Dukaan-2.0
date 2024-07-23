import express from "express";
const router = express.Router();
import {
  addPurchaseData,
  getPartyPurchaseData,
} from "../controller/purchase.controller.js";

// Add new purchase record data
router.post("/add", addPurchaseData);

// Get party-wise purchase data
router.get("/party-wise", getPartyPurchaseData);

export default router;
