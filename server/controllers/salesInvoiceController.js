import SalesInvoice from "../models/salesInvoivceModal.js";
// import supplierModel from "../models/supplierModel.js";
// import Customer from '../models/customerModal.js';
// import medicineModel from '../models/medicineModel.js';



// Create a new Sales Invoice
export const createSalesInvoice = async (req, res) => {
    try {
        console.log(req.body);
        const newSalesEstimat = new SalesInvoice({
            date: req.body.date,
            invoiceNo: req.body.invoiceNo,
            customerName: req.body.customerName,
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
        const validationError = newSalesEstimat.validateSync(); // This will synchronously validate the schema
    
        if (validationError) {
            // If validation fails, respond with a 400 Bad Request status and error details
            console.log(validationError.message)
            return res.status(400).json({ message: validationError.message });
        }
    
        // If validation passes, save the new purchase
        await newSalesEstimat.save();
    
        // Respond with success message and the saved purchase object
        res.status(201).json({ message: "SalesEstimate Successfully congrates", newSalesEstimat });
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error adding salesEstimate:", error);
        res.status(500).json({ message: "SalesEstimate Unsuccessful" });
    }
    }

// Get all Sales Invoices
export const getAllSalesInvoices = async (req, res) => {
    try {
        const salesInvoices = await SalesInvoice.find()
        res.status(200).json(salesInvoices);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single Sales Invoice by ID
export const getSalesInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const salesInvoice = await SalesInvoice.findById(id)
        if (!salesInvoice) {
            return res.status(404).json({ message: 'Sales Invoice not found' });
        }
        res.status(200).json(salesInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a Sales Invoice by ID
export const updateSalesInvoiceById = async (req, res) => {
    const { id } = req.params;
   
        const updatedData = {
            date: req.body.date,
            invoiceNo: req.body.invoiceNo,
            customerName : req.body.customerName,
            // suuplierName: req.body.suuplierName,
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
                const updatedSales = await SalesInvoice.findByIdAndUpdate(id, updatedData, { new: true });
                if (!updatedSales) {
                    return res.status(404).json({ message: "salesInvoice  not found" });
                }
                res.status(200).json({ message: "SalesInvoice updated successfully", updatedSales });
            } catch (error) {
                res.status(400).json({ message: "Failed to update SalesEstimate", error: error.message });
            }
};

// Delete a Sales Invoice by ID
export const deleteSalesInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const salesInvoice = await SalesInvoice.findByIdAndDelete(id);
        if (!salesInvoice) {
            return res.status(404).json({ message: 'Sales Invoice not found' });
        }
        res.status(200).json({ message: 'Sales Invoice deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
