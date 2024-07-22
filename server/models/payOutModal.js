import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const payOutSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    paymentNo:{
        type:Number,
        required:true,
        unique:true,
    },
    supplierDetails:{
        type:String,
        required:true,
    },
    paymentMode:{
        type:String,
        enum:["Cash", "Bank"],
        required:true,
    },
    bank:{
        type:String,
        required: function() { return this.receiptMode === "Bank"; }
    },
    paymentMethod:{
        type:String,
        enum:["Online", "Cheque"],
        required: function() { return this.receiptMode === "Bank"; }
    },
    transaction:{
        type:String,
        required: function() { return this.receiptMode === "Bank" && this.paymentMethod === "Online"; }

    },
    chequeNo:{
        type:String,
        required: function() { return this.receiptMode === "Bank" && this.paymentMethod === "Cheque"; }

    },
   purchaseTable:[{
    billNo:{
        type:Number,
        required:true,
    },
    billAmount:{
        type:Number,
        required:true,
    },
    paymentAmount:{
        type:Number,
        required:true
    },
    balanceAmount:{
        type:Number,
        required:true,
    },
    // total:{
    //     type:Number,
    //     required:true,
    // },
    narration:{
        type:String,
    }
   }],
},{timestamps:true})

const PayOut  = mongoose.model("PayOut", payOutSchema);
export default PayOut;

