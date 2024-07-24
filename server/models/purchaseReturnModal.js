import mongoose from "mongoose";

const purchaseReturnSchema = new mongoose.Schema({
    purchaseReturn:{
        suppplierName:{
            type:String,
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
            type:String,
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
            type:String,
             required:true,
        },
        reasonForReturn:{
            type:String,

        },

    },
    purchaseTable:{
        itemCode:{
            type:String,
            required:true,
    
        },
        productName:{
            type:String,
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
