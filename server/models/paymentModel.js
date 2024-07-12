import mongoose, { mongo } from "mongoose";


const paymentSchema = new mongoose.Schema({
    cash:{
        amount:{
            // type:mongoose.Schema.Types.ObjectId,
            // ref:"PurchaseModal",
            // //  required:true,
            type:String,
        },
        advance:{
            type:Number,
            //  required:true,
        },
        paid:{
            type:Number,
            // required:true,
        },
        balance:{
            type:Number,
        //    required:true,
        },
        description:{
            type:String,
            // required:true,
        },
    },
    Bank:{
        selectBank:{
            type:String,
            // required:true,
        },
        paymentMethod:{
            online:{
                transactionDate:{
                    type:Date,
                    // required:true,
                },
                transactionNo:{
                    type:String,
                    // required:true,
                },
            },
            cheque:{
                transactionDate:{
                    type:Date,
                    // required:true,
                },
                chequeNo:{
                    type:Date,
                    // required:true,
                },
                advance:{
                    type:Number, 
                    // required:true,
                },
                paid:{
                  type:Number,
                // required:true,
                },
                balance:{
                    type:Number,
                    // required:true,
                },
                description:{
                    type:String,
                },

            },
 
        },
    },
  

}, {timestamps:true});


const Payment = mongoose.model("Payment",paymentSchema);
export default Payment;
