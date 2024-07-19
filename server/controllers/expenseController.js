import mongoose from "mongoose";
import Expense from "../models/expenseModal.js";
// Add a new expense record with all fields
export const addExpense = async (req, res) => {
  try {
    const newExpense = new Expense({
      date: req.body.date,
      expenseNo: req.body.expenseNo,
      paymentMode: req.body.paymentMode,
      taxType: req.body.taxType,
      bank: req.body.bank,
      paymentMethod: req.body.paymentMethod,
      transaction: req.body.transaction,
      chequeNo: req.body.chequeNo,
      purchaseTable: req.body.purchaseTable,
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    res.status(400).json({ message: "Expense addition unsuccessful", error: error.message });
  }
};
