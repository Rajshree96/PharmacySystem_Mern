import PurchaseModal from "../models/purchaseModal.js";


// Add a new purchase record with all fields
export const addPurchase = async (req, res) => {
    try {
        const newPurchase = new PurchaseModal({
            date: req.body.date,
            invoiceNumber: req.body.invoiceNumber,
            // supplierInvoiceNo: req.body.supplierInvoiceNo,
            suuplierName: req.body.suuplierName,
            placeOfSupply: req.body.placeOfSupply,
            paymentTerm: req.body.paymentTerm,
            dueDate: req.body.dueDate,
            transPortDetails: req.body.transPortDetails,
            billingAddress: req.body.billingAddress,
            reverseCharge: req.body.reverseCharge,
            purchaseTable: req.body.purchaseTable,
            amounts: req.body.amounts,
            Narration: req.body.Narration,
            // paymentStatus: req.body.paymentStatus

        });
        console.log("newPurchase", newPurchase);

        await newPurchase.save();
        res.status(201).json({message:"Purchase Successfully congrates",newPurchase});
    } catch (error) {
        res.status(400).json({ message: "Purchase Unsuuccessfull" });
    }
};

//getall purchesh 
export const getAllPurchases = async (req, res) => {
    try {
        const purchases = await PurchaseModal.find();
        res.status(200).json(purchases);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve purchases", error: error.message });
    }
};
 
// Update a purchase record
export const updatePurchase = async (req, res) => {
    const { id } = req.params;
    const updatedData = {
        date: req.body.date,
        invoiceNumber: req.body.invoiceNumber,
        // supplierInvoiceNo: req.body.supplierInvoiceNo,
        suuplierName: req.body.suuplierName,
        placeOfSupply: req.body.placeOfSupply,
        paymentTerm: req.body.paymentTerm,
        dueDate: req.body.dueDate,
        transPortDetails: req.body.transPortDetails,
        billingAddress: req.body.billingAddress,
        reverseCharge: req.body.reverseCharge,
        purchaseTable: req.body.purchaseTable,
        amounts: req.body.amounts,
        Narration: req.body.Narration,
        paymentStatus: req.body.paymentStatus
    };

    try {
        const updatedPurchase = await PurchaseModal.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        res.status(200).json({ message: "Purchase updated successfully", updatedPurchase });
    } catch (error) {
        res.status(400).json({ message: "Failed to update purchase", error: error.message });
    }
};


// Delete a purchase record
export const deletePurchase = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPurchase = await PurchaseModal.findByIdAndDelete(id);
        if (!deletedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete purchase", error: error.message });
    }
};
