import PayOut from "../models/payOutModal.js";
// Add a new pay-out record with all fields
export const addPayOut = async (req, res) => {
  try {
    const newPayOut = new PayOut({
      date: req.body.date,
      paymentNo: req.body.paymentNo,
      supplierDetails: req.body.supplierDetails,
      paymentMode: req.body.paymentMode,
      narration:req.body.narration,
      purchaseTable: req.body.purchaseTable,
    });


     // Only include bank-related fields if receiptMode is "Bank"
  if (req.body.paymentMode === "Bank") {
    newPayOut.bank = req.body.bank;
    newPayOut.paymentMethod = req.body.paymentMethod;
    if (req.body.paymentMethod === "Online") {
      newPayOut.transaction = req.body.transaction;
    } else if (req.body.paymentMethod === "Cheque") {
      newPayOut.chequeNo = req.body.chequeNo;
    }
  }

  // Validate the newPurchase object against the PurchaseModal schema
  const validationError = newPayOut.validateSync(); // This will synchronously validate the schema
 
  if (validationError) {
      // If validation fails, respond with a 400 Bad Request status and error details
      console.log(validationError.message)
      return res.status(400).json({ message: validationError.message });
  }

    await newPayOut.save();
    console.log(newPayOut);
    res.status(201).json({ message: "Pay-out added successfully", newPayOut });
  } catch (error) {
    res.status(400).json({ message: "Pay-out addition unsuccessful", error: error.message });
  }
};
