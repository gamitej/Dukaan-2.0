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
    const parties = await getAllParties();

    const formattedPartyName = parties?.map((item) => {
      return {
        id: item.party_id,
        name: item.party_name,
        label: "Pending Payment -",
        value: `Rs ${item.pending_payment}`,
      };
    });

    return res.status(200).json(formattedPartyName);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
