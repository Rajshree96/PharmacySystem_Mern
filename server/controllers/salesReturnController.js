import SalesReturn from "../models/saleReturnModal.js";
// Create a new Sales Invoice

export const createSalesReturn = async (req, res) => {
    try {
        console.log(req.body);
    const newSalesReturn = new SalesReturn({
        date: req.body.date,
        creditNoteNo: req.body.creditNoteNo,
        customerName: req.body.customerName,
        paymentTerm: req.body.paymentTerm,
        dueDate: req.body.dueDate,
        selectedSales:req.body.selectedSales,
        reasonForReturn:req.body.reasonForReturn,
       
        billingAddress: req.body.billingAddress,
        purchaseTable: req.body.purchaseTable,
    });
 // Validate the newPurchase object against the PurchaseModal schema
 const validationError = newSalesReturn.validateSync(); // This will synchronously validate the schema

 if (validationError) {
     // If validation fails, respond with a 400 Bad Request status and error details
     console.log(validationError.message)
     return res.status(400).json({ message: validationError.message });
 }
 await newSalesReturn.save();

    // Respond with success message and the saved purchase object
    res.status(201).json({ message: "SalesReturn Successfully congrates", newSalesReturn });


} catch (error) {
    // Handle any unexpected errors
    console.error("Error adding SalesReturn:", error);
    res.status(500).json({ message: "SalesReturn Unsuccessful" });
}
}
