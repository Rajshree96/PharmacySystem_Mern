import DeliveryChallan from '../models/deliveryChalanModal.js';


// Create a new delivery challan
export const createDeliveryChallan = async (req, res) => {
    try {
        
        const newDeliveryChallan= new DeliveryChallan({
            date: req.body.date,
            deliveryChallanNo: req.body.deliveryChallanNo,
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
          const validationError = newDeliveryChallan.validateSync(); // This will synchronously validate the schema
    
          if (validationError) {
              // If validation fails, respond with a 400 Bad Request status and error details
              console.log(validationError.message)
              return res.status(400).json({ message: validationError.message });
          }
      
          // If validation passes, save the new purchase
          await newDeliveryChallan.save();
      
          // Respond with success message and the saved purchase object
          res.status(201).json({ message: "DeliveryChallan Successfully congrates", newDeliveryChallan });

    } catch (error) {
        res.status(400).json({
            message: "Failed to create Delivey Challan",
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
