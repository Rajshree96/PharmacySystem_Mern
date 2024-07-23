import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    journalNo:{
        type:Number,
        required:true,
        unique:true
    },
    selectedAccount:{
        type:String,
        required:true,
    },
   
        purchaseTable:[{
            account:{
               type:String,
               required:true,
            },
            amount:{
               type:String,
               required:true,
            },
          
          }],
          narration:{
            type:String,
        }
        
},{timestamps:true})


const Journal = mongoose.model("Journal", journalSchema);
export default Journal;

