import mongoose from "mongoose";
import FixedAssets from "../models/fixedAssetsModal.js";
// Add a new fixed asset record with all fields
export const addFixedAsset = async (req, res) => {
  try {
    const newFixedAsset = new FixedAssets({
      date: req.body.date,
      invoiceNo: req.body.invoiceNo,
      supplierInvoiceNo: req.body.supplierInvoiceNo,
      supplierName: req.body.supplierName,
      placeOfSupply: req.body.placeOfSupply,
      taxType: req.body.taxType,
      purchaseTable: req.body.purchaseTable,
      grossTotal: req.body.grossTotal,
      gstAmount: req.body.gstAmount,
      otherCharge: req.body.otherCharge,
      netAmount: req.body.netAmount,
      narration: req.body.narration,
    });

    await newFixedAsset.save();
    res.status(201).json({ message: "Fixed asset added successfully", newFixedAsset });
  } catch (error) {
    res.status(400).json({ message: "Fixed asset addition unsuccessful", error: error.message });
  }
};
