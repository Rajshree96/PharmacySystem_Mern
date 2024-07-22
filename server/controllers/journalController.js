import Journal from "../models/journalModal.js";
// Add a new journal record with all fields
export const addJournal = async (req, res) => {
  try {
    const newJournal = new Journal({
      date: req.body.date,
      journalNo: req.body.journalNo,
      selectedAccount: req.body.selectedAccount,
      narration:req.body.narration,
      purchaseTable: req.body.purchaseTable,

    });

     // Validate the newPurchase object against the PurchaseModal schema
   const validationError = newJournal.validateSync(); // This will synchronously validate the schema
 
   if (validationError) {
       // If validation fails, respond with a 400 Bad Request status and error details
       console.log(validationError.message)
       return res.status(400).json({ message: validationError.message });
   }

    await newJournal.save();
    res.status(201).json({ message: "Journal entry added successfully", newJournal });
  } catch (error) {
    res.status(400).json({ message: "Journal entry addition unsuccessful", error: error.message });
  }
};
