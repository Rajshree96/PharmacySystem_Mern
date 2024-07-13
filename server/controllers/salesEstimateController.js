import SalesEstimate from "../models/salesEstimateModal.js";
// import Supplier from '../models/supplierModel.js';
// import Medicine from '../models/medicineModel.js';

export const salesEstimate = {
  // Create a new sales estimate
  create: async (req, res) => {
    try {
      const newSalesEstimate = new SalesEstimate(req.body);

      // Save the new sales estimate before populating
      const savedSalesEstimate = await newSalesEstimate.save();

      // Populate the referenced fields
      await savedSalesEstimate.populate([
        { path: 'customerName', select: 'name' },
        { path: 'placeOfSupply', select: 'state' },
        { path: 'purchaseTable.itemCode', select: 'itemCode' },
        { path: 'purchaseTable.productName', select: 'medicineName' }
      ]);

      res.status(201).json({ message: "SalesEstimate added", savedSalesEstimate });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all sales estimates
  getAll: async (req, res) => {
    try {
      const salesEstimates = await SalesEstimate.find()
        .populate('customerName', 'name')
        .populate('placeOfSupply', 'state')
        .populate('purchaseTable.itemCode', 'itemCode')
        .populate('purchaseTable.productName', 'medicineName');
      
      res.status(200).json(salesEstimates);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Edit a sales estimate by ID
  edit: async (req, res) => {
    try {
      const updatedSalesEstimate = await SalesEstimate.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate([
        { path: 'customerName', select: 'name' },
        { path: 'placeOfSupply', select: 'state' },
        { path: 'purchaseTable.itemCode', select: 'itemCode' },
        { path: 'purchaseTable.productName', select: 'medicineName' }
      ]);

      if (!updatedSalesEstimate) {
        return res.status(404).json({ message: "SalesEstimate not found" });
      }

      res.status(200).json({ message: "SalesEstimate updated", updatedSalesEstimate });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a sales estimate by ID
  delete: async (req, res) => {
    try {
      const deletedSalesEstimate = await SalesEstimate.findByIdAndDelete(req.params.id);

      if (!deletedSalesEstimate) {
        return res.status(404).json({ message: "SalesEstimate not found" });
      }

      res.status(200).json({ message: "SalesEstimate deleted", deletedSalesEstimate });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default salesEstimate;
