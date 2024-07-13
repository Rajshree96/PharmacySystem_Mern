import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const salesReturnSchema = new mongoose.Schema({
    customerName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true,
    },
    date:{
        type:String,
        default: Date.now(),
        required:true,
    },
    creditNoteNo:{
        type:Number,
        required:true,
        unique:true,
    },
    paymentTerm:{
        type:Date,
        default:Date.now(),
         required:true,
    },
    dueDate:{
        type:Date,
        required:true,
    },
   billingAddress:{
    type:String,
     required:true,
   },
   selectedSales:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"PurchaseModal",
    required:true,
   },
reasonForReturn:{
    type:String,
    required:true,
},
   purchaseTable:{
    itemCode:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Medicine",
        required:true,

    },
    productName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Medicine",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    mrp:{
        type:Number,
        required:true
    },
    retailPrice:{
        type:String,
        required:true,
    },
    taxableValue:{
        type:Number,
        required:true,
    },
    cGst:{
        type:String,
        required:true,
    },
    sGst:{
       type:String,
       required:true,
    },
    iGst:{
        type:String,
        required:true,
    },
    totalValue:{
        type:Number,
        required:true,
    },
   },
},{timestamps:true})

const SalesReturn = mongoose.model("SalesReturn", salesReturnSchema);
export default SalesReturn;
