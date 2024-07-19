import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    journalNo:{
        type:Number,
        required:true,
    },
    selectedAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FixedAssets",
        required:true,
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FixedAssets",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    narration:{
        type:String,
    },
},{timestamps:true})


const Journal = mongoose.model("Journal", journalSchema);
export default Journal;

