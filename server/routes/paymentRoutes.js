import express from "express";
import { addPayment } from "../controllers/paymentController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";


const paymentRouter = express.Router();

    //payment router 
paymentRouter.post("/add", checkUserLogin, isAdmin,addPayment);



export default paymentRouter;


