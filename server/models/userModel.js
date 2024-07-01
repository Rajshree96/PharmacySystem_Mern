import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    gender:{
        type:String,
        require:true,
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
        type:Number,
        required:true,
    },
    country:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        
    },
    confirmPassword:{
        type:String,
    },
    role:{
        type:Number,
        default:0
        }
    
},
{timestamps:true} // jab bhi new user create hoga uska time mil jayega

)

export const userModel =  mongoose.model('users',userSchema);