import express from "express";
import {
  AddProductSale,
  DeleteProductSale,
  GetProductSaleDetails,
  GetSalesOverview,
} from "../controller/sale.controller.js";

const router = express.Router();

// Get sale details
router.get("/all", GetProductSaleDetails);

// Add product sale details
router.post("/add", AddProductSale);

// Delete product sale details
router.post("/delete", DeleteProductSale);

// Get sale overview
router.get("/overview", GetSalesOverview);

export default router;
