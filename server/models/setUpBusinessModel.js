import mongoose  from "mongoose";

const setUpBusinessSchema = new mongoose.Schema({
     businessInfo:{
        businessLogo: {
            type:String,
            required:true,
        },
        businessName: {
           type:String,
           required: true,
           trim: true,
        },
      address:{
        type: String,
        required: true,
     },
     pinCode:{
        type: Number,
        required: true
     },
     state:{
        type: String,
        required: true,
     },
     country:{
        type: String,
        required: true,
     },
     email:{
        type: String,
        required: true,
        unique: true,
     },
     website:{
        type: String,
     },
     phoneNumber:{
        type:String,
        required: true,
     },
     financialYear: {
       type:String,
        required:true
    },
    bookBeginning: {
        type: Date,
        required: true,
    },
     },
     statutoryDetails:{
        enableGst:{
            type: Boolean,
            // enum: ['Yes', 'NO'],
            required: true,

        },
        stateRegistrationType:{
            type: String ,
            enum:['Regular', 'Composition'],
            required: true,
        },
        taxRate:{
            type:String,
        },
        gstin:{
            type:String,
        },
        drugLicenceNo:{
        type: String,
        },
        otherTax:{
            type: Boolean,
        },
        taxName:{
            type:String,
        },
        taxNumber:{
            type: String,
        },
        state:{
            type: String,
            required: true,
        }

     },
     bankDetails: {
        bankName: {
            type: String,
            required: true,
        },
        bankAddress: {
            type: String,
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
}, {timestamps: true});

const SetUpBusiness = mongoose.model('SetUpBusiness', setUpBusinessSchema);

export default SetUpBusiness;
