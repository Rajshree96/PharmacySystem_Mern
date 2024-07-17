<<<<<<< HEAD
import mongoose from "mongoose";
=======
import mongoose from  "mongoose";
>>>>>>> 44796ec4f7eaeead03f7957aad93a2c7bce65847


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
                    type:String,
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
