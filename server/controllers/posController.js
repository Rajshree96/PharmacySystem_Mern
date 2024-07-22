import POS from '../models/posModal.js';





// Create a new POS entry
// Create a new POS entry
export const createPOs = async (req, res) => {
    try {
        const newPos = new POS({
            date: req.body.date,
            invoiceNo: req.body.invoiceNo,
            customerName: req.body.customerName,
            paymentType: req.body.paymentType,
 
            purchaseTable: req.body.purchaseTable,
            amounts: req.body.amounts,
            
        });
        const validationError = newPos.validateSync(); // This will synchronously validate the schema
 
        if (validationError) {
            // If validation fails, respond with a 400 Bad Request status and error details
            console.log(validationError.message)
            return res.status(400).json({ message: validationError.message });
        }
        await newPos.save();
   res.status(201).json({
            message: "POS entry created successfully",
            newPos
     });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};