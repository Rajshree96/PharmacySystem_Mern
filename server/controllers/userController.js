import { userModel } from "../models/userModel.js";
import { error,success } from "../utills/responseWrapper.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../services/generateAccessToken.js";

export async function registerController(req,res){
    try {
        const { firstName, lastName,gender,address,state,pinCode,country, email, password,confirmPassword} = req.body;
        
        if(!firstName || !lastName || !gender || !address || !state ||!pinCode || !country || !email || !password  || !confirmPassword ){
            return res.send(error(404,"all fields are required"));
           }
       
           if(password!=confirmPassword){
            return res.send(error(400,"password and confirm password are not equal"))
           }
    // check user
    const existingUser = await userModel.findOne({ email });

    // existing user
    if(existingUser){
        return res.send(error(409,"you have registered,please login"));
      }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password,10);

    // Create a new user instance
    const newUser = new userModel({firstName,lastName,gender,address,state,pinCode,
        country,email,password:hashedPassword});
       await newUser.save();
       return res.send(success(200,"user Registered successfully")); 
    } catch (err) {
        return res.send(error(500,err.message));
    }
}

export async function loginController(req,res){
    try {
        const {email,password} = req.body;
        if( !email || !password){
            return res.send(error(404,"all fields are required"));
           }
        const user = await userModel.findOne({email});
      
        if(!user){
            return res.send(error(409,"user not exist, !please Register"));
        }
        const match = await  bcrypt.compare(password,user.password);
        
        if(!match){
            return res.send(error(404,"password not matched, please enter right password"))
        }
        const token = generateAccessToken({...user});
        
        return res.send(success(200,{token,user}));

    } catch (err) {
        return res.send(error(500,err.message));
    }
}

