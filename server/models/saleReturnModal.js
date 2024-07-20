import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const salesReturnSchema = new mongoose.Schema({
    date: { type: String, required: true },
    creditNoteNo: { type: String, required: true },
    customerName: { type: String, required: true },
    paymentTerm: { type: String, required: true },
    dueDate: { type: String, required: true },
    selectedSales:{type:String, required:true},
    reasonForReturn:{type:String, required:true},
    billingAddress: { type: String, required: true },
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
   
});


const SalesReturn = mongoose.model("SalesReturn", salesReturnSchema);
export default SalesReturn;
