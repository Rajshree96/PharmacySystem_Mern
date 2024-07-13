import express from "express";
import { createSalesReturn } from "../controllers/salesReturnController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";


const salesReturnRouter = express.Router();


//add sales return 
salesReturnRouter.post("/add", checkUserLogin, isAdmin,createSalesReturn)

export default salesReturnRouter;
