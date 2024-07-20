import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const incomeSchema = new mongoose.Schema({
    date:{
        type:String,
        default: Date.now(),
        required:true,
    },
    IncomeNo:{
        type:Number,
        required:true,
        unique:true,
    },
    recivedMode:{
        type:String,
        enum:["Cash", "bank"],
        required:true,
    },
    taxType:{
      type:String,
      enum:["CGST","SGST", "IGST", "Non GST"],
      required:true,
    },
     bank:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bank",
        required:true,
     },
     method:{
       type:String,
       enum:["Online", "Cheque"],
       required:true,
     },
     transaction:{
        type:Number,
        required:true,
     },
  chequeNO:{
    type:Number,
    required:true
  },

   purchaseTable:{
    account:{
        type:String,
        required:true,
    },
    productService:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Amount:{
        type:Number,
        required:true
    },
    Tax:{
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
   },
   TotalValue:{
    type:Number,
    required:true,
   },
   narration:{
    type:String,
   }
},{timestamps:true})

const Income = mongoose.model("Income", incomeSchema);
export default Income;
