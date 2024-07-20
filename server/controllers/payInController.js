import mongoose from "mongoose";
import PayIN from "../models/payInModal.js";
// Add a new pay-in record with all fields
export const addPayIn = async (req, res) => {
  try {
    const newPayIn = new PayIN({
      date: req.body.date,
      receiptNo: req.body.receiptNo,
      customerDetail: req.body.customerDetail,
      receiptMode: req.body.receiptMode,
      bank: req.body.bank,
      paymentMethod: req.body.paymentMethod,
      transaction: req.body.transaction,
      chequeNo: req.body.chequeNo,
      purchaseTable: req.body.purchaseTable,
    });

    await newPayIn.save();
    res.status(201).json({ message: "Pay-in added successfully", newPayIn });
  } catch (error) {
    res.status(400).json({ message: "Pay-in addition unsuccessful", error: error.message });
  }
};
