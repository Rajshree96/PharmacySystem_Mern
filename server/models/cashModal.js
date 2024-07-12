import mongoose from "mongoose";

const cashSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    openingBalance:{
        type:Number,
        required:true,
    }
});

const Cash = mongoose.model("Cash", cashSchema);
export default Cash;
