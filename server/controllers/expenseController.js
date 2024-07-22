import Expense from "../models/expenseModal.js";
// Add a new expense record with all fields
export const addExpense = async (req, res) => {
  try {
    const newExpense = new Expense({
      date: req.body.date,
      expenseNo: req.body.expenseNo,
      paymentMode: req.body.paymentMode,
      taxType: req.body.taxType,
      narration:req.body.narration,
      purchaseTable: req.body.purchaseTable,
    });

    // Only include bank-related fields if receiptMode is "Bank"
  if (req.body.receiptMode === "Bank") {
    newExpense.bank = req.body.bank;
    newExpense.paymentMethod = req.body.paymentMethod;
    if (req.body.paymentMethod === "Online") {
      newExpense.transaction = req.body.transaction;
    } else if (req.body.paymentMethod === "Cheque") {
      newExpense.chequeNo = req.body.chequeNo;
    }
  }

   // Validate the newPurchase object against the PurchaseModal schema
   const validationError = newExpense.validateSync(); // This will synchronously validate the schema
 
   if (validationError) {
       // If validation fails, respond with a 400 Bad Request status and error details
       console.log(validationError.message)
       return res.status(400).json({ message: validationError.message });
   }
    
    await newExpense.save();
    console.log(newExpense);
    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    res.status(400).json({ message: "Expense addition unsuccessful", error: error.message });
  }
};
