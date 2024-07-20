import mongoose from "mongoose";
import PayIN from "../models/payInModal.js";
// Add a new pay-in record with all fields
export const addPayIn = async (req, res) => {
  try {
    console.log(req.body)
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
    if (!date || !receiptNo || !customerDetail || !receiptMode || !paymentMethod || !purchaseTable) {
      return res.status(400).json({ message: "All required fields must be provided and non-empty" });
    }

    await newPayIn.save();
    res.status(201).json({ message: "Pay-in added successfully", newPayIn });
  } catch (error) {
    res.status(400).json({ message: "Pay-in addition unsuccessful", error: error.message });
  }
};
