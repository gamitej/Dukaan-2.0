// import sequelize from "../database/connection.js";
import PendingPayment from "../models/pendingPayment.model.js";

export async function PurchaseToPendingPayment(req, transaction) {
  // const transaction = await sequelize.transaction();
  try {
    const { order_id, party_id, price } = req;

    // Check if the order already exists
    const existingPayment = await PendingPayment.findOne({
      where: { order_id },
      transaction,
    });

    if (existingPayment) {
      // Update the existing order's total_amount
      existingPayment.total_amount += price;
      await existingPayment.save({ transaction });
    } else {
      // Create a new PendingPayment entry
      await PendingPayment.create(
        {
          order_id,
          party_id,
          total_amount: price,
        },
        { transaction }
      );
    }

    // await transaction.commit();
    return { data: order_id, isError: false };
  } catch (error) {
    // await transaction.rollback();
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
