import Jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
import {error} from "../utills/responseWrapper.js";


const secretKey = "manasvitech";

export async function checkUserLogin(req,res,next){
    try {
        if (!req.headers?.authorization?.startsWith("Bearer")){
            return res.send(error(401,"authorization header is required"));
           }
        const accessToken = req.headers.authorization.split(" ")[1];
        const decoded = Jwt.verify(accessToken,secretKey);
        req._id = decoded?._doc?._id;
        next();
    } catch (err) {
        return res.send(error(500,err.message));
    }
}


export const isAdmin = async (req,res,next)=>{

    try {
       
       const user = await userModel.findById(req._id);
 
       if(user.role!==1){
          return res.status(401).send({
             success:false,
             message:"UnAuthorized Access"
          })
       } else{
          next();
       }
    } catch (error) {
       console.log(error);
    }
 }

 export const isStaff = async (req,res,next)=>{

    try {
       
       const user = await userModel.findById(req._id);
 
       if(user.role!==2){
          return res.status(401).send({
             success:false,
             message:"UnAuthorized Access"
          })
       } else{
          next();
       }
    } catch (error) {
       console.log(error);
    }
 }