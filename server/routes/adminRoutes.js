import express from "express";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";
import { addMedicineController } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post('/add-medicine',checkUserLogin,isAdmin, addMedicineController);




export default adminRouter;