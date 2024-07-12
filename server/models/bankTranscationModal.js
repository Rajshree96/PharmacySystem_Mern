import mongoose from "mongoose";

const bankTransaction = new mongoose.Schema({
    BankToBank:{
        date:{
            type:Date,
            required:true,
        },
        contraNo:{
            type:Number,
            required:true,
        },
        fromBank:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bank",
            required:true,
        },
        toBank:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bank",
            required:true,
        },
    },
    cashDeposit:{
        date:{
            type:Date,
            required:true,
        },
        contraNo:{
            type:Number,
            required:true,
        },
        

    }
})