import express from "express";
const router = express.Router();
import {
  addPurchaseData,
  deletePartyPurchaseData,
  getPartyPurchaseData,
} from "../controller/purchase.controller.js";

// Add new purchase record data
router.post("/add", addPurchaseData);

// Get party-wise purchase data
router.get("/party-wise", getPartyPurchaseData);

// Get party-wise purchase data
router.post("/delete-purchase", deletePartyPurchaseData);

export default router;
