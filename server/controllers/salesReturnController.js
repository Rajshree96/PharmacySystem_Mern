import supplierModel from "../models/supplierModel.js";
import Customer from '../models/customerModal.js';
import medicineModel from '../models/medicineModel.js';
import SalesReturn from "../models/saleReturnModal.js";
import PurchaseModal from "../models/purchaseModal.js";
// Create a new Sales Invoice
export const createSalesReturn = async (req, res) => {
    try {
        const salesReturn = new SalesReturn(req.body);
        await salesReturn.save();
        const populatedSalesReturn = await SalesReturn.findById(salesReturn._id)
            .populate("customerName", "customerDetails.name")
            .populate("selectedSales", "invoiceNumber")
            .populate('purchaseTable.itemCode', 'itemCode')
            .populate('purchaseTable.productName', 'medicineName');
        
        const invoiceNumber = populatedSalesReturn.selectedSales.invoiceNumber;
        const customerName = populatedSalesReturn.customerName.customerDetails.name;

        res.status(201).json({
            message: "Sales Return Generated Successfully",
            invoiceNumber,
            customerName,
            populatedSalesReturn
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


