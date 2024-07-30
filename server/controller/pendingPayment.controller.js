import { fn, col, literal } from "sequelize";
import { DateCondition } from "../utils/date.js";
import PendingPayment from "../models/pendingPayment.model.js";

export async function PurchaseToPendingPayment(req, transaction) {
  try {
    const { order_id = "", party_id, price } = req;
    const price_num = parseInt(price);

    // Check if the order already exists
    const existingPayment = await PendingPayment.findOne({
      where: { order_id },
      transaction,
    });

    if (existingPayment) {
      // Update the existing order's total_amount
      existingPayment.total_amount += price_num;
      const addPayment = await existingPayment.save({ transaction });

      if (!addPayment)
        throw new Error("Error while adding payment in pending payment");

      return { data: order_id };
    } else {
      // Create a new PendingPayment entry
      const paymentCreated = await PendingPayment.create(
        {
          party_id,
          total_amount: price_num,
        },
        { transaction }
      );

      if (!paymentCreated)
        throw new Error("Error while creating pending payment!");

      return { data: paymentCreated.order_id };
    }
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function DeletePurchaseFromPendingPayment(req, transaction) {
  try {
    const { order_id = "", price } = req;
    const price_num = parseInt(price);

    // Check if the order already exists
    const existingPayment = await PendingPayment.findOne({
      where: { order_id },
      transaction,
    });
    if (!existingPayment)
      throw new Error("Order id not found in pending payment");

    if (existingPayment.paid_amount > 0)
      throw new Error("Can't delete purchase because payment is made");

    if (existingPayment.total_amount === price_num) {
      const pendingDelete = await PendingPayment.destroy({
        where: { order_id },
        transaction,
      });

      if (!pendingDelete)
        throw new Error("Error while deleting pending payment data");
    } else {
      // Update the existing order's total_amount
      existingPayment.total_amount -= price_num;
      const paymentUpdated = await existingPayment.save({ transaction });

      if (!paymentUpdated)
        throw new Error("Error while updating pending payment");
    }
    return;
  } catch (error) {
    console.error("DeletePurchaseFromPendingPayment Error:", error); // Debugging
    throw new Error(error.message || error);
  }
}
export async function GetPartyPendingPaymentDetails(req, res) {
  try {
    const { party_id, startDate, endDate } = req.query;

    if (!party_id) return res.status(400).json("Missing party_id parameter");
    if (!startDate) return res.status(400).json("Missing start date parameter");
    if (!endDate) return res.status(400).json("Missing end date parameter");

    const dateCondition = DateCondition({
      ...req.query,
      date_label: "createdAt",
    });

    // Fetch purchase data based on party_id
    const pendingPaymentData = await PendingPayment.findAll({
      where: {
        party_id: party_id,
        ...dateCondition,
      },
      order: [
        ["createdAt", "DESC"],
        ["order_id", "ASC"],
      ],
    });

    // Query to get the total purchase amount and total pending payment
    const totals = await PendingPayment.findAll({
      where: {
        party_id: party_id,
        ...dateCondition,
      },
      attributes: [
        [fn("SUM", col("total_amount")), "totalPurchase"],
        [
          fn("SUM", literal("total_amount - paid_amount")),
          "totalPendingPayment",
        ],
      ],
    });

    if (!pendingPaymentData)
      return res.json(404).json("Party pending payment not found!");

    const totalPurchase = totals[0]?.dataValues.totalPurchase || 0;
    const totalPendingPayment = totals[0]?.dataValues.totalPendingPayment || 0;

    return res
      .status(200)
      .json({ pendingPaymentData, totalPurchase, totalPendingPayment });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
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
      throw new Error("Order id not found in pending payment");

    const total_paid_amount = parseInt(amount) + existingPayment.paid_amount;

    if (existingPayment.total_amount >= total_paid_amount) {
      // Update the existing order's total_amount
      existingPayment.paid_amount = total_paid_amount;
      const paymentUpdated = await existingPayment.save({ transaction });

      if (!paymentUpdated)
        throw new Error("Error while adding total payment in pending payment");

      return { data: order_id };
    }

    throw new Error("Payment cannot be greather than total amount");
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function DeletePaidAmountDetails(req, transaction) {
  try {
    const { order_id = "", payment: amount } = req;

    // Check if the order already exists
    const existingPayment = await PendingPayment.findOne({
      where: { order_id },
      transaction,
    });

    if (!existingPayment)
      throw new Error("Order id not found in pending payment");

    const total_paid_amount = existingPayment.paid_amount - parseInt(amount);

    if (total_paid_amount >= 0) {
      // Update the existing order's total_amount
      existingPayment.paid_amount = total_paid_amount;
      await existingPayment.save({ transaction });
      return { data: order_id };
    }

    throw new Error("Incorrect payment data");
  } catch (error) {
    throw new Error(error.message || error);
  }
}
