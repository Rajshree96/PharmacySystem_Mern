import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    bankName:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    state:{
      type:String,
      required:true,
    },
    country:{
        type:String,
        required:true,
    },
    pinCode:{
        type:Number,
        required:true,
        maxlength:6,
        validate: function(v){
            return /^\d{6}$/.test(v); 
        },
        message: props => `${props.value} is not a valid pincode! It should be exactly 6 digits.`

    },
    accountHolderName:{
        type:String,
        required:true,
        unique:true,
    },
    accountNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    ifscCode:{
        type:String,
        required:true,
        unique:true,
    },
    mobileNo:{
      type:Number,
      required:true,
      unique:true,
    },
    openingBalance:{
       type:Number,
       reuiqred:true,

    }

});

const Bank = mongoose.model("Bank", bankSchema);
export default Bank;
