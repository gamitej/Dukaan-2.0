// import sequelize from "../database/connection.js";
import PendingPayment from "../models/pendingPayment.model.js";

export async function PurchaseToPendingPayment(req, transaction) {
  try {
    const { order_id = "", party_id, price } = req;

    // Check if the order already exists
    const existingPayment = await PendingPayment.findOne({
      where: { order_id },
      transaction,
    });

    const price_num = parseInt(price);

    if (existingPayment) {
      // Update the existing order's total_amount
      existingPayment.total_amount += price_num;
      await existingPayment.save({ transaction });
      return { data: order_id, isError: false };
    } else {
      // Create a new PendingPayment entry
      const data = await PendingPayment.create(
        {
          party_id,
          total_amount: price_num,
        },
        { transaction }
      );
      return { data: data.order_id, isError: false };
    }
  } catch (error) {
    return { data: error, isError: true };
  }
}

export async function DeletePurchaseFromPendingPayment(req, transaction) {
  try {
    const { order_id = "", price } = req;

    // Check if the order already exists
    const existingPayment = await PendingPayment.findOne({
      where: { order_id },
      transaction,
    });

    if (!existingPayment) {
      return { data: "Order id not found in pending payment", error: true };
    }

    const price_num = parseInt(price);

    // Update the existing order's total_amount
    existingPayment.total_amount -= price_num;
    await existingPayment.save({ transaction });

    return { data: order_id, isError: false };
  } catch (error) {
    return { data: error, isError: true };
  }
}

export async function GetPartyPendingPaymentDetails(req, res) {
  try {
    const { party_id } = req.query;

    if (!party_id) return res.status(400).json("Missing party_id parameter");

    // Fetch purchase data based on party_id
    const pendingPaymentData = await PendingPayment.findAll({
      where: {
        party_id: party_id,
      },
      order: [
        ["createdAt", "DESC"],
        ["order_id", "ASC"],
      ],
    });

    if (!pendingPaymentData)
      return res.json(404).json("Party pending payment not found!");

    return res.status(200).json(pendingPaymentData);
  } catch (error) {}
}

export async function UpdatePaidAmountDetails(req, transaction) {
  try {
    const { order_id = "", payment: amount } = req;

    // Check if the order already exists
    const existingPayment = await PendingPayment.findOne({
      where: { order_id },
      transaction,
    });

    if (!existingPayment)
      return { data: "Order id not found in pending payment", isError: true };

    const total_paid_amount = parseInt(amount) + existingPayment.paid_amount;

    if (existingPayment.total_amount >= total_paid_amount) {
      // Update the existing order's total_amount
      existingPayment.paid_amount = total_paid_amount;
      await existingPayment.save({ transaction });
      return { data: order_id, isError: false };
    }

    return {
      data: "Payment cannot be greather than total amount",
      isError: true,
    };
  } catch (error) {
    return { data: error, isError: true };
  }
}
