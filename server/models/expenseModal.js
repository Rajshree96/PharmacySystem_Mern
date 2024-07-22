import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    expenseNo:{
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
        type:String,
        required: function() { return this.receiptMode === "Bank" && this.paymentMethod === "Online"; }

    },
    chequeNo:{
        type:String,
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
        required:true,
     },
     tax:{
       type:String,
       required:true, 
     },
     taxAmount:{
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

const Expense  = mongoose.model("Expense", expenseSchema);
export default Expense;
