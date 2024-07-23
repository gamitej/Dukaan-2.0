// import sequelize from "../database/connection.js";
import PendingPayment from "../models/pendingPayment.model.js";

export async function PurchaseToPendingPayment(req, transaction) {
  // const transaction = await sequelize.transaction();
  try {
    const { order_id = "", party_id, price } = req;

    // Check if the order already exists
    const existingPayment = await PendingPayment.findOne({
      where: { order_id },
      transaction,
    });

    if (existingPayment) {
      // Update the existing order's total_amount
      existingPayment.total_amount += parseInt(price);
      await existingPayment.save({ transaction });
      return { data: order_id, isError: false };
    } else {
      // Create a new PendingPayment entry
      const data = await PendingPayment.create(
        {
          party_id,
          total_amount: price,
        },
        { transaction }
      );
      return { data: data.order_id, isError: false };
    }
  } catch (error) {
    return { data: error, isError: true };
  }
}

export async function addPendingPaymentData(req, res) {
  return "";
}

export async function modifyPendingPaymentData(req, res) {
  return "";
}

export async function getPendingPaymentData(req, res) {
  return "";
}
