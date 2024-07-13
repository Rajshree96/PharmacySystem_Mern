import mongoose from "mongoose";
// import supplierModel from "./supplierModel.js";
// import medicineModel from "./medicineModel.js";

const purchaseModalSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    invoiceNumber:{
        type:String,
        unique:true,
        required:true,

    },
    supplierInvoiceNo:{
        type:String,
        unique:true,
        required:true,
    },
    supplierName:{
    type:String,
    required:true,

    },
    placeOfSupply:{
        type:String,
        required:true,
    },
    paymentTerm:{
        type:String,
        required:true,
        
    },
    dueDate:{
        type:String,
        required:true,
    },

   transPortDetails:{
    ReceiptNo:{
        type:String,
        required:true,
    },
    dispatchedThrough:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    carrierName:{
        type:String,
        required:true,
    },
    billOfLanding:{
        type:String,
        required:true,
    },
  motorNo:{
    type:String,
    required:true,
  },


   },
   billingAddress:{
    type:String,
    required:true,
   },
   reverseCharge:{
    type:String,
    enum:["Yes", "No"],
    required:true,
   },

   purchaseTable:{
    itemCode:{
        type:String,
        required:true,  
    },
    productName:{
        type:String,
        required:true,  
       
    },
    quantity:{
        type:Number,
        required:true,
    },
    freeQuantity:{
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
        // required:true,
    },
    discount2:{
       type:String,
    //    reuired:true,
    },
    taxableValue:{
        type:Number,
        required:true,
    },
    cGst:{
        type:String,
        // required:true,
    },
    sGst:{
       type:String,
    //    required:true,
    },
    iGst:{
        type:String,
        // required:true,
    },
    totalValue:{
        type:Number,
        required:true,
    },
   },

   amounts:{
    grossAmount:{
        type:Number,
        required:true,
    },
     gstAmount:{
        type:Number,
        required:true,
     },
     otherCharge:{
        type:Number,
        // required:true,
     },
     netAmount:{
        type:Number,
        required:true,
     },
   },
   Narration:{
    type:String,
   },
//    paymentStatus:{
//     type:String,
//     enum:["Success", "Failure"],
//     default:"Failure",
// },
//    voucherType:{
//     type:String,
//     enum:["purchase","payout","purchase return"] 
//    },
//    particular:{
//     type:String,
//     enum:["Opening Bal","By Purchase","To Bank"],
//    },

},
{timestamps:true})

const PurchaseModal = mongoose.model("PurchaseModal", purchaseModalSchema);
export default PurchaseModal;