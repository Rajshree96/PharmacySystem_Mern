import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const salesEstimateSchema  = new mongoose.Schema({
    date: { type: String, required: true },
    estimateNo: { type: String, required: true },
    customerName: { type: String, required: true },
    placeOfSupply: { type: String, required: true },
    paymentTerm: { type: String, required: true },
    dueDate: { type: String, required: true },
    transPortDetails: {
        receiptNumber: { type: String, required: true },
        dispatchedThrough: { type: String, required: true },
        destination: { type: String, required: true },
        carrierName: { type: String, required: true },
        billOfLading: { type: String, required: true }
    },
    billingAddress: { type: String, required: true },
    reverseCharge: { type: String, required: true },
    purchaseTable: [{
        sno: { type: String, required: true },
        itemCode: { type: String, required: true },
        productName: { type: String, required: true },
        qty: { type: String, required: true },
        // freeQty: { type: String, required: true },
        mrp: { type: String, required: true },
        retailPrice: { type: String },
        // unitCost: { type: String, required: true },
        taxableValue: { type: String, required: true },
        totalValue: { type: String, required: true },
        // discount1: { type: String },
        // discount2: { type: String },
        cgst: { type: String },
        sgst: { type: String},
        igst: { type: String },
    }],
    amounts: {
        grossAmount: { type: String, required: true },
        gstAmount: { type: String, required: true },
        otherCharge: { type: Number},
        netAmount: { type: String, required: true }
    },
    Narration: { type: String }
});


const SalesEstimate = mongoose.model("SalesEstimate", salesEstimateSchema);
export default SalesEstimate;
