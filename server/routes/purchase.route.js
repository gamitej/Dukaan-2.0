import express from "express";
const router = express.Router();
import {
  addPurchaseData,
  getPartyPurchaseData,
} from "../controller/purchase.controller.js";

// Add party name
router.post("/add-purchase", addPurchaseData);

// All parties name
router.get("/party-purchase", getPartyPurchaseData);

export default router;
