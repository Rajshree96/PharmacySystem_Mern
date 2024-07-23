import mongoose from "mongoose";

const bankTransactionSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        enum: ['Bank to Bank', 'Cash Deposit in Bank', 'Cash Withdrawal from Bank'],
        required: true
    },
        date:{
            type:String,
            required:true,
        },
        contraNo:{
            type:Number,
            required:true,
        },
        fromAccount:{
            type:String,
            required: function() { 
                return this.transactionType === 'Bank to Bank' || this.transactionType === 'Cash Withdrawal from Bank'; 
            },

        },
        toAccount:{
            type:String,
            required: function() { 
                return this.transactionType === 'Bank to Bank' || this.transactionType === 'Cash Deposit in Bank'; 
            },

        },
        amount:{
            type:Number,
            required: function() { 
                return  this.transactionType === 'Cash Withdrawal from Bank'; 
            },

        }
    },
    
{timestamps:true});

const Transaction = mongoose.model("Transaction", bankTransactionSchema)
export default Transaction;



