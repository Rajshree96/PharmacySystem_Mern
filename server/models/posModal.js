import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const POSSchema = new mongoose.Schema({
    date: { type: String, required: true },
    invoiceNo: { type: String, required: true },
    customerName: { type: String, required: true },
    paymentType: { type: String, required: true },
   
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
        netAmount: { type: String, required: true }
    },
},{timestamps:true})

const POS  = mongoose.model("POS", POSSchema);
export default POS;
