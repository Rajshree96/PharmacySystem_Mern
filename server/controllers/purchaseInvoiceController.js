import PurchaseInvoice from "../models/purchaseInvoiceModel.js";


// Add a new purchase record with all fields
// export const addPurchase = async (req, res) => {
//     try {
//         const newPurchase = new PurchaseModal({
//             date: req.body.date,
//             orderNo: req.body.orderNo,
//             supplierName: req.body.supplierName,
//             placeOfSupply: req.body.placeOfSupply,
//             paymentTerm: req.body.paymentTerm,
//             dueDate: req.body.dueDate,
//             transPortDetails: {
//                 receiptNumber: req.body.transPortDetails.receiptNumber,
//                 dispatchedThrough: req.body.transPortDetails.dispatchedThrough,
//                 destination: req.body.transPortDetails.destination,
//                 carrierName: req.body.transPortDetails.carrierName,
//                 billOfLading: req.body.transPortDetails.billOfLading
//             },
//             billingAddress: req.body.billingAddress,
//             reverseCharge: req.body.reverseCharge,
//             purchaseTable: req.body.purchaseTable,
//             amounts: {
//                 grossAmount: req.body.amounts.grossAmount,
//                 gstAmount: req.body.amounts.gstAmount,
//                 otherCharge: req.body.amounts.otherCharge,
//                 netAmount: req.body.amounts.netAmount
//             },
//             Narration: req.body.Narration
//         });
//         console.log(req.body.purchaseTable);
//         console.log(newPurchase);
//         await newPurchase.save();
//         console.log('pavan---------------------------------------')
//         res.status(201).json({message:"Purchase Successfully congrates",newPurchase});
//     } catch (error) {
//         res.status(500).json({ message: "Purchase Unsuuccessfull" });
//     }
// };


export const addPurchaseInvoice = async (req, res) => {
    try {
        
        const newPurchase =  new PurchaseInvoice({
            date: req.body.date,
            orderNo: req.body.orderNo,
            invoiceNo:req.body.invoiceNo,
            supplierName: req.body.supplierName,
            placeOfSupply: req.body.placeOfSupply,
            paymentTerm: req.body.paymentTerm,
            dueDate: req.body.dueDate,
            transPortDetails: {
                                receiptNumber: req.body.transPortDetails.receiptNumber,
                                dispatchedThrough: req.body.transPortDetails.dispatchedThrough,
                                destination: req.body.transPortDetails.destination,
                                carrierName: req.body.transPortDetails.carrierName,
                                billOfLading: req.body.transPortDetails.billOfLading
                          },
            billingAddress: req.body.billingAddress,
            reverseCharge: req.body.reverseCharge,
            purchaseTable: req.body.purchaseTable,
            amounts: req.body.amounts,
            Narration: req.body.Narration
        });
        
        // Validate the newPurchase object against the PurchaseModal schema
        const validationError = newPurchase.validateSync(); // This will synchronously validate the schema

        if (validationError) {
            // If validation fails, respond with a 400 Bad Request status and error details
            console.log(validationError.message)
            return res.status(400).json({ message: validationError.message });
        }

        // If validation passes, save the new purchase
        await newPurchase.save();

        console.log(newPurchase)

        // Respond with success message and the saved purchase object
        res.status(201).json({ message: "Purchase Successfully congrates", newPurchase });
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error adding purchase:", error);
        res.status(500).json({ message: "Purchase Unsuccessful" });
    }
};

//getall purchesh 
export const getAllPurchasesInvoice = async (req, res) => {
    try {
        const purchases = await PurchaseInvoice.find();
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve purchases", error: error.message });
    }
};
 
// Update a purchase record
export const updatePurchaseInvoice = async (req, res) => {
    const { id } = req.params;
    const {...updatedData}= req.body;

    try {
        const updatedPurchase = await PurchaseInvoice.findByIdAndUpdate({ _id:id },
            updatedData,
            { new: true } );
        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        res.status(200).json({ message: "Purchase updated successfully", updatedPurchase });
    } catch (error) {
        res.status(400).json({ message: "Failed to update purchase", error: error.message });
    }
};


// Delete a purchase record
export const deletePurchaseInvoice = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPurchase = await PurchaseInvoice.findByIdAndDelete(id);
        if (!deletedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete purchase", error: error.message });
    }
};