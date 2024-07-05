import express from "express";
import { loginController, registerController } from "../controllers/userController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";
const userRouter = express.Router();

userRouter.post('/register',registerController);
userRouter.post('/login',loginController);
userRouter.get('/user-auth',checkUserLogin,(req,res)=>{
    res.status(200).send({ok:true})
})


// Protected route for admin
userRouter.get('/admin-auth',checkUserLogin,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

export default userRouter;