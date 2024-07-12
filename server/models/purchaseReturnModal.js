import mongoose from "mongoose";

const purchaseReturnSchema = new mongoose.Schema({
    purchaseReturn:{
        suppplierName:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Supplier",
             required:true,
             unique:true,
        },
        Date:{
            type:Date,
            required:true,
        },
        DebitNoteNo:{
          type:Number,
          required:true,
        },
        placeOfSupply:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Supplier",
             required:true,
        },
        paymentTerm:{
            type:Date,
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
        selectedPurchase:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"PurchaseModal",
             required:true,
        },
        reasonForReturn:{
            type:String,

        },

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
           
            // required:true,
        },
        quantity:{
            type:Number,
             required:true,
        },
        mrp:{
            type:Number,
            required:true
        },
        unitCost:{
            type:String,
            required:true,
        },
        discount1:{
            type:String,
            required:true,
        },
        discount2:{
           type:String,
            reuired:true,
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
    
})

const PurchaseReturn = mongoose.model("PurchaseReturn", purchaseReturnSchema);
export default PurchaseReturn;
