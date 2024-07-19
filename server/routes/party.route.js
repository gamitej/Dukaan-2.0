import express from "express";
//models
import Party from "../models/party.model.js";
import { getAllParties } from "../utils/party.js";

const router = express.Router();

// Add party name
router.post("/add-name", async (req, res) => {
  try {
    const { name } = req.body;

    const newParty = await Party.create({ party_name: name });

    if (newParty) return res.status(200).json("Added new party!");

    return res.status(400).json("Something went wrong!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// All parties name
router.get("/all", async (req, res) => {
  try {
    const parties = getAllParties();

    if (parties?.length > 0) return res.status(200).json(parties);

    return res.status(200).json([]);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
