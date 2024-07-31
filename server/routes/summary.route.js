import express from "express";
//models
import {
  getCategoryWiseOverview,
  getLastSixMonthOverview,
  getOverallSummayOverview,
} from "../controller/summary.controller.js";

const router = express.Router();

// Get overvall dukaan summary overview
router.get("/overvall-summary", getOverallSummayOverview);

// Get last 6 months overview
router.get("/monthly-overview", getLastSixMonthOverview);

// Get categories wise overview
router.get("/category-overview", getCategoryWiseOverview);

export default router;
