import mongoose from "mongoose";
import Journal from "../models/journalModal.js";
// Add a new journal record with all fields
export const addJournal = async (req, res) => {
  try {
    const newJournal = new Journal({
      date: req.body.date,
      journalNo: req.body.journalNo,
      selectedAccount: req.body.selectedAccount,
      account: req.body.account,
      amount: req.body.amount,
      narration: req.body.narration,
    });

    await newJournal.save();
    res.status(201).json({ message: "Journal entry added successfully", newJournal });
  } catch (error) {
    res.status(400).json({ message: "Journal entry addition unsuccessful", error: error.message });
  }
};
