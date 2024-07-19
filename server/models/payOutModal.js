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
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",
        required:true,
    },
    paymentMode:{
        type:String,
        enum:["Cash", "Bank"],
        required:true,
    },
    bank:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bank",
        required:true,
    },
    paymentMethod:{
        type:String,
        enum:["Online", "Cheque"],
        required:true,
    },
    transaction:{
        type:String,
    },
    chequeNo:{
        type:String
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
    total:{
        type:Number,
        required:true,
    },
    narration:{
        type:String,
    }
   }],
},{timestamps:true})

const PayOut  = mongoose.model("PayOut", payOutSchema);
export default PayOut;

