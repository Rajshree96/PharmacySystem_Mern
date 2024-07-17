import POS from '../models/posModal.js';
import Customer from '../models/customerModal.js';
import medicineModel from '../models/medicineModel.js';





// Create a new POS entry
// Create a new POS entry
export const createPOs = async (req, res) => {
    try {
        const {date, invoiceNo, customerDetail, paymentType, purchaseTable } = req.body;

        // Validate and save POS entry
        const pos = new POS({
            date,
            invoiceNo,
            customerDetail,
            paymentType,
            purchaseTable
        });
        await pos.save();

        // Populate customer details and medicine details in POS
        const populatedPOS = await POS.findById(pos._id)
            .populate('customerDetail', 'customerDetails.name customerDetails.contact customerDetails.email')
            .populate('purchaseTable.itemCode', 'itemCode')
            .populate('purchaseTable.productName', 'medicineName');

        // // Extract populated data for response
        const customerName = populatedPOS.customerDetail.customerDetail;
        const customerContact = populatedPOS.customerDetail.customerDetail;
        const customerEmail = populatedPOS.customerDetail.customerDetail;

        res.status(201).json({
            message: "POS entry created successfully",
            pos,
            customerName,
            customerContact,
            customerEmail,
            populatedPOS

            
            
          
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};