import express from "express";
import {
  AddPartyPaymentDetails,
  GetPartyPaymentDetails,
} from "../controller/payment.controller.js";

const router = express.Router();

// Party payment details
router.get("/party-wise", GetPartyPaymentDetails);

router.post("/add", AddPartyPaymentDetails);

export default router;
