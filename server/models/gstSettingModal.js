import mongoose from "mongoose";


const gstSettingSchema = new mongoose.Schema({
  gstName:{
   
      type:String,
      required:true,
    },
  
   
})

const GstSetting = mongoose.model("GstSetting", gstSettingSchema);
export default GstSetting;

