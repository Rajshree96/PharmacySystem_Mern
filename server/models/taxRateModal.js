import mongoose from "mongoose";


const taxRateSchema = new mongoose.Schema({
  taxRate:{
      type:String,
      required:true,
    },
  
   
})

const TaxRate = mongoose.model("TaxRate", taxRateSchema);
export default TaxRate;

