import Stock from "../models/stock.model.js";

// export const findOrCreateStock = async (product_id) => {
//   try {
//     let stock = await Stock.findOne({ where: { product_id } });

//     if (!stock) {
//       stock = await Stock.create({ product_id, quantity: 0 });
//     }
//     return stock;
//   } catch (error) {
//     throw new Error("Error finding or creating stock: " + error.message);
//   }
// };

// export const addStockQuantity = async (stock, quantity) => {
//   try {
//     stock.quantity += quantity;
//     await stock.save();
//     return stock;
//   } catch (error) {
//     throw new Error("Error adding stock quantity: " + error.message);
//   }
// };

// export const subtractStockQuantity = async (stock, quantity) => {
//   try {
//     if (stock.quantity < quantity) {
//       throw new Error("Insufficient stock to subtract");
//     }
//     stock.quantity -= quantity;
//     await stock.save();
//     return stock;
//   } catch (error) {
//     throw new Error("Error subtracting stock quantity: " + error.message);
//   }
// };

export const updateStockQuantity = async (
  product_id,
  quantityChange,
  transaction
) => {
  try {
    // Find or create the stock entry
    let stock = await Stock.findOne({ where: { product_id } });
    if (!stock) {
      stock = await Stock.create({ product_id, quantity: 0 }, { transaction });
    }

    // Update stock quantity based on quantityChange
    if (quantityChange >= 0) {
      // Adding stock
      stock.quantity += quantityChange;
    } else {
      // Subtracting stock
      const quantityToSubtract = Math.abs(quantityChange);
      if (stock.quantity < quantityToSubtract) {
        throw new Error("Insufficient stock to subtract");
      }
      stock.quantity -= quantityToSubtract;
    }

    // Save the updated stock
    await stock.save();
    return stock;
  } catch (error) {
    throw new Error("Error updating stock quantity: " + error.message);
  }
};
