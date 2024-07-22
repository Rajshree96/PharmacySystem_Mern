import PayIN from "../models/payInModal.js";
// Add a new pay-in record with all fields
export const addPayIn = async (req, res) => {
  try {
    console.log(req.body);
    
    const newPayIn = new PayIN({
      date: req.body.date,
      receiptNo: req.body.receiptNo,
      customerDetail: req.body.customerDetail,
      receiptMode: req.body.receiptMode,
      narration:req.body.narration,
      purchaseTable: req.body.purchaseTable,
    });
  
  // Only include bank-related fields if receiptMode is "Bank"
  if (req.body.receiptMode === "Bank") {
    newPayIn.bank = req.body.bank;
    newPayIn.paymentMethod = req.body.paymentMethod;
    if (req.body.paymentMethod === "Online") {
      newPayIn.transaction = req.body.transaction;
    } else if (req.body.paymentMethod === "Cheque") {
      newPayIn.chequeNo = req.body.chequeNo;
    }
  }
  // Validate the newPurchase object against the PurchaseModal schema
  const validationError = newPayIn.validateSync(); // This will synchronously validate the schema
 
  if (validationError) {
      // If validation fails, respond with a 400 Bad Request status and error details
      console.log(validationError.message)
      return res.status(400).json({ message: validationError.message });
  }
    await newPayIn.save();
   
    res.status(201).json({ message: "Pay-in added successfully", newPayIn });
  } catch (error) {
    res.status(400).json({ message: "Pay-in addition unsuccessful", error: error.message });
  }
}
