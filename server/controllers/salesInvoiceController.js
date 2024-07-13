import SalesInvoice from "../models/salesInvoivceModal.js";
import supplierModel from "../models/supplierModel.js";
import Customer from '../models/customerModal.js';
import medicineModel from '../models/medicineModel.js';
// Create a new Sales Invoice
export const createSalesInvoice = async (req, res) => {
    try {
        const salesInvoice = new SalesInvoice(req.body);
        await salesInvoice.save();
        const populatedInvoice = await SalesInvoice.findById(salesInvoice._id)
            .populate('customerName', 'customerDetails.name')
            .populate('placeOfSupply', 'name')
            .populate('purchaseTable.itemCode', 'itemCode')
            .populate('purchaseTable.productName', 'medicineName');
        res.status(201).json({message:"SalesInvoice Genrate Successfully",populatedInvoice});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Sales Invoices
export const getAllSalesInvoices = async (req, res) => {
    try {
        const salesInvoices = await SalesInvoice.find()
            .populate('customerName', 'customerDetails.name')
            .populate('placeOfSupply', 'name')
            .populate('purchaseTable.itemCode', 'itemCode')
            .populate('purchaseTable.productName', 'medicineName');
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
            .populate('customerName', 'customerDetails.name')
            .populate('placeOfSupply', 'name')
            .populate('purchaseTable.itemCode', 'itemCode')
            .populate('purchaseTable.productName', 'medicineName');
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
    try {
        const salesInvoice = await SalesInvoice.findByIdAndUpdate(id, req.body, { new: true })
            .populate('customerName', 'customerDetails.name')
            .populate('placeOfSupply', 'name')
            .populate('purchaseTable.itemCode', 'itemCode')
            .populate('purchaseTable.productName', 'medicineName');
        if (!salesInvoice) {
            return res.status(404).json({ message: 'Sales Invoice not found' });
        }
        res.status(200).json(salesInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
