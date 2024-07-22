import Income from "../models/incomeModal.js";


export const addIncome = async (req, res)=>{
  try {
    const newIncome = new Income ({
      date: req.body.date,
      incomeNo: req.body.incomeNo,
      paymentMode:req.body.paymentMode,
      taxType: req.body.taxType,
      narration:req.body.narration,
      purchaseTable: req.body.purchaseTable,
    });

     // Only include bank-related fields if receiptMode is "Bank"
  if (req.body.receiptMode === "Bank") {
    newIncome.bank = req.body.bank;
    newIncome.paymentMethod = req.body.paymentMethod;
    if (req.body.paymentMethod === "Online") {
      newIncome.transaction = req.body.transaction;
    } else if (req.body.paymentMethod === "Cheque") {
      newIncome.chequeNo = req.body.chequeNo;
    }
  }
  


   // Validate the newPurchase object against the PurchaseModal schema
   const validationError = newIncome.validateSync(); // This will synchronously validate the schema
 
   if (validationError) {
       // If validation fails, respond with a 400 Bad Request status and error details
       console.log(validationError.message)
       return res.status(400).json({ message: validationError.message });
   }
    
    await newIncome.save();
    console.log(newIncome);
    res.status(201).json({ message: "income added successfully", newIncome });
  }
  catch (error) {
        res.status(400).json({ message: error.message });

    }
}