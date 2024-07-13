import DeliveryChallan from '../models/deliveryChalanModal.js';
import Customer from '../models/customerModal.js';
import supplierModel from '../models/supplierModel.js';
import medicineModel from '../models/medicineModel.js';

// Create a new delivery challan
export const createDeliveryChallan = async (req, res) => {
    try {
        const newDeliveryChallan = new DeliveryChallan(req.body);
        
        // Save the new delivery challan
        let savedDeliveryChallan = await newDeliveryChallan.save();

        // Populate the required fields after saving with specific fields
        savedDeliveryChallan = await DeliveryChallan.findById(savedDeliveryChallan._id)
            .populate('customerName', 'customerDetails.name') // populate only the customer's name
            .populate('placeOfSupply', 'state') // populate only the supplier's name
            .populate('purchaseTable.itemCode', 'itemCode') // populate only the item code
            .populate('purchaseTable.productName', 'medicineName'); // populate only the medicine name

        res.status(201).json({
            message: "Delivery Challan created successfully",
            data: savedDeliveryChallan
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create Delivery Challan",
            error: error.message
        });
    }
};
// Get all delivery challans
export const getAllDeliveryChallans = async (req, res) => {
    try {
        const deliveryChallans = await DeliveryChallan.find()
            .populate('customerName', 'customerDetails.name') // populate only the customer's name
            .populate('placeOfSupply', 'name') // populate only the supplier's name
            .populate('purchaseTable.itemCode', 'itemCode') // populate only the item code
            .populate('purchaseTable.productName', 'medicineName'); // populate only the medicine name

        res.status(200).json({
            message: "Delivery Challans retrieved successfully",
            data: deliveryChallans
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to retrieve Delivery Challans",
            error: error.message
        });
    }
};


export const editDeliveryChallan = async (req, res) => {
    const { id } = req.params;

    try {
        let updatedDeliveryChallan = await DeliveryChallan.findByIdAndUpdate(id, req.body, { new: true });

        // Populate the required fields after updating with specific fields
        updatedDeliveryChallan = await DeliveryChallan.findById(updatedDeliveryChallan._id)
            .populate('customerName', 'customerDetails.name') // populate only the customer's name
            .populate('placeOfSupply', 'name') // populate only the supplier's name
            .populate('purchaseTable.itemCode', 'itemCode') // populate only the item code
            .populate('purchaseTable.productName', 'medicineName'); // populate only the medicine name

        res.status(200).json({
            message: "Delivery Challan updated successfully",
            data: updatedDeliveryChallan
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update Delivery Challan",
            error: error.message
        });
    }
};


export const deleteDeliveryChallan = async (req, res) => {
    const { id } = req.params;

    try {
        await DeliveryChallan.findByIdAndDelete(id);

        res.status(200).json({
            message: "Delivery Challan deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete Delivery Challan",
            error: error.message
        });
    }
};
