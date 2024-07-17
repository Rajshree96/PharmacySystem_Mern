import mongoose from "mongoose";
import PayOut from "../models/payOutModal.js";
// Add a new pay-out record with all fields
export const addPayOut = async (req, res) => {
  try {
    const newPayOut = new PayOut({
      date: req.body.date,
      paymentNo: req.body.paymentNo,
      supplierDetails: req.body.supplierDetails,
      paymentMode: req.body.paymentMode,
      bank: req.body.bank,
      paymentMethod: req.body.paymentMethod,
      transaction: req.body.transaction,
      chequeNo: req.body.chequeNo,
      purchaseTable: req.body.purchaseTable,
    });

    await newPayOut.save();
    res.status(201).json({ message: "Pay-out added successfully", newPayOut });
  } catch (error) {
    res.status(400).json({ message: "Pay-out addition unsuccessful", error: error.message });
  }
};
