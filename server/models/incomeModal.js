import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const incomeSchema = new mongoose.Schema({
    date:{
        type:String,
        default: Date.now(),
        required:true,
    },
    incomeNo:{
        type:Number,
        required:true,
        unique:true,
    },
    paymentMode:{
        type:String,
        enum:["Cash", "Bank"],
        required:true,
    },
    taxType:{
      type:String,
      enum:["CGST/SGST", "IGST", "Non GST"],
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
        type:Number,
        required: function() { return this.receiptMode === "Bank" && this.paymentMethod === "Online"; }

     },
  chequeNo:{
    type:Number,
    required: function() { return this.receiptMode === "Bank" && this.paymentMethod === "Cheque"; }

  },

   purchaseTable:[{
    account:{
        type:String,
        required:true,
    },
    product:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    tax:{
        type:String,
        required:true,
    },
    taxAmount:{
        type:Number,
        required:true,
    },
    totalValue:{
        type:Number,
        required:true,
    },
   }],
//    TotalValue:{
//     type:Number,
//     required:true,
//    },
   narration:{
    type:String,
   }
},{timestamps:true})

const Income = mongoose.model("Income", incomeSchema);
export default Income;
