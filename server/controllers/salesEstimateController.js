import SalesEstimate from "../models/salesEstimateModal.js";
// import Supplier from '../models/supplierModel.js';
// import Medicine from '../models/medicineModel.js';

export const salesEstimate = async(req, res)=>{
  // Create a new sales estimate
  try {
    console.log(req.body);
    const newSalesEstimat = new SalesEstimate({
        date: req.body.date,
        estimateNo: req.body.estimateNo,
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


//getall purchesh 
export const getSalesEstimate = async (req, res) => {
  try {
      const salesEstimates = await SalesEstimate.find();
      res.status(200).json(salesEstimates);
  } catch (error) {
      res.status(500).json({ message: "Failed to retrieve salesEstimate", error: error.message });
  }
};

  
// Update a purchase record
export const updatedSalesEstimate = async (req, res) => {
  const { id } = req.params;
  const updatedData = {
      date: req.body.date,
      estimateNo: req.body.estimateNo,
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
      const updatedSales = await SalesEstimate.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedSales) {
          return res.status(404).json({ message: "salesEstimate not found" });
      }
      res.status(200).json({ message: "SalesEstimate updated successfully", updatedSales });
  } catch (error) {
      res.status(400).json({ message: "Failed to update SalesEstimate", error: error.message });
  }
};

  // Delete a purchase record
export const deleteSalesEstimate = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedSales = await SalesEstimate.findByIdAndDelete(id);
      if (!deletedSales) {
          return res.status(404).json({ message: "salesEstimate not found" });
      }
      res.status(200).json({ message: "salesEstimate deleted successfully" });
  } catch (error) {
      res.status(400).json({ message: "Failed to delete SalesEstimate", error: error.message });
  }
};

  

export default salesEstimate;
