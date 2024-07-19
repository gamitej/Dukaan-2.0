import Party from "../models/party.model.js";

// Function to insert a user into the Party table
export async function insertParty(name) {
  try {
    const newParty = await Party.create({ name });
    console.log("New Party Created:", newParty.toJSON());
  } catch (error) {
    console.error("Error inserting party:", error);
  }
}

// Function to retrieve all parties
export async function getAllParties() {
  try {
    const parties = await Party.findAll();
    return parties;
  } catch (error) {
    console.error("Error retrieving parties:", error);
    return [];
  }
}
