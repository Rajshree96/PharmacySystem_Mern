import PurchaseReturn from '../models/purchaseReturnModal.js';
// import supplierModel from '../models/supplierModel.js';
// import PurchaseModal from '../models/purchaseModal.js';
// import Medicine from '../models/medicineModel.js';




export const purchaseReturnController = {
  // Create a new purchase return
  create: async (req, res) => {
    try {
      const newPurchaseReturn = new PurchaseReturn(req.body);
      
      // Populate the referenced fields
      await newPurchaseReturn.populate([
        { path: 'purchaseReturn.suppplierName', select: 'name' },
        { path: 'purchaseReturn.placeOfSupply', select: 'state' },
        { path: 'purchaseReturn.selectedPurchase', select: 'invoiceNumber' },
        { path: 'purchaseTable.itemCode', select: 'itemCode' },
        { path: 'purchaseTable.productName', select: 'medicineName' }
      ]);

      const savedPurchaseReturn = await newPurchaseReturn.save();
      
      res.status(201).json(savedPurchaseReturn);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default purchaseReturnController;