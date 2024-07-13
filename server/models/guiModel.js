import mongoose from "mongoose";

const GUISchema = new mongoose.Schema({
    date:{
        type:String,
        default: Date.now(),
        required:true,
    },
    invoiceNo:{
        type:Number,
        required:true,
        unique:true,
    },
    customerDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true,
    },
    paymentType:{
        type:String,
        enum:["Cash", "online"],
        required:true,
    },
   purchaseTable:[{
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
    totalValue:{
        type:Number,
        required:true,
    },
   }],
},{timestamps:true})

const GUI  = mongoose.model("GUI", GUISchema);
export default GUI;
