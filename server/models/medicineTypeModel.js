import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    mediType:{
        type:String,
        required:true,
        
    },

}, {timestamps: true})

const MedicineType = mongoose.model("MedicineType", medicineSchema);

export default MedicineType;
