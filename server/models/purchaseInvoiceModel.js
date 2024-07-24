
import mongoose from 'mongoose';

const PurchaseInvoiceSchema = new mongoose.Schema({
    date: { type: String, required: true },
    orderNo: { type: String, required: true },
    invoiceNo:{type:Number,required:true},
    supplierName: { type: String, required: true },
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
    taxType:{type:String},
    purchaseTable: [{
        sno: { type: String, required: true },
        itemCode: { type: String, required: true },
        productName: { type: String, required: true },
        qty: { type: String, required: true },
        freeQty: { type: String, required: true },
        mrp: { type: String, required: true },
        unitCost: { type: String, required: true },
        taxableValue: { type: String, required: true },
        totalValue: { type: String, required: true },
        discount1: { type: String },
        discount2: { type: String },
        cgst: { type: String },
        sgst: { type: String},
        igst: { type: String },
    }],
    amounts: {
        grossAmount: { type: String, required: true },
        gstAmount: { type: String, required: true },
        otherCharge: { type: Array, required: true },
        netAmount: { type: String, required: true }
    },
    Narration: { type: String },
    paymentStatus:{
        type:String,
        default:"PENDING"
    }
});

const PurchaseInvoice = mongoose.model('PurchaseInvoice', PurchaseInvoiceSchema);

export default PurchaseInvoice;
