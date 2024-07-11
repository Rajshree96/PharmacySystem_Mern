import mongoose from "mongoose";

const OpeningBalanceSchema = new mongoose.Schema({
    asOnFirstDayOfFinancialYear: {
      type: Number,
      
    },
  });

const customerSchema = new mongoose.Schema({
    customerDetails:{
        name:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
            state:{
                type:String,
                required:true,
            },
            pinCode:{
                type:Number ,
                required:true,
            },
            country:{
                type:String,
                required:true,

            },
            contact:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true,
                unique: true,
            },
            website:{
                type:String,
                reuired:true,
            },
            bankDetails: {
                bankName: {
                    type: String,
                    required: true,
                },
                bankAddress: {
                    type: String,
                    required:true,
                },
                ifscCode: {
                    type: String,
                    required: true,
                },
                accountHolderName: {
                    type: String,
                    required: true,
                },
                accountNumber: {
                    type: Number,
                    required: true,
                },
                
            },
            statutoryDetails:{
                stateRegistrationType:{
                    type: String ,
                    enum:['Regular', 'Composition', 'Consumer'],
                    required: true,
                },
                gstin:{
                    type:String,
                    required:true,
                },
            },
            openingBalance: {
                type: OpeningBalanceSchema,
                required:true
                
              },     
    }
})


const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
