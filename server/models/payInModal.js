import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const payInSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    receiptNo:{
        type:Number,
        required:true,
        unique:true,
    },
    customerDetail:{
        type:String,
        required:true,
    },
    receiptMode:{
        type:String,
        enum:["Cash", "Bank"],
        required:true,
    },
    bank:{
        type:String,
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
    recivedAmount:{
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
   
   }],
   narration:{
    type:String,
}
},{timestamps:true})

const PayIN  = mongoose.model("PayIN", payInSchema);
export default PayIN;
