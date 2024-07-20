import express from "express";
const router = express.Router();
import {
  addIdentityData,
  getAllIdentitiesData,
} from "../controller/identity.controller.js";

// Add party name
router.post("/add", addIdentityData);

// All parties name
router.get("/all", getAllIdentitiesData);

export default router;
