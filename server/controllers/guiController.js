import GUI from '../models/guiModel.js';
import Customer from '../models/customerModal.js';
import medicineModel from '../models/medicineModel.js';






export const createGUI= async (req, res) => {
    try {
        const { date,invoiceNo, customerDetail, paymentType, purchaseTable } = req.body;

        // Validate and save POS entry
        const gui = new GUI({
            date,
            invoiceNo,
            customerDetail,
            paymentType,
            purchaseTable
        });
        await gui.save();


        res.status(201).json({
            message: "GUI entry created successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};