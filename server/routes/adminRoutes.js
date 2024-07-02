import express from "express";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";
import { addMedicineController, deleteMedicineController, getAllMedicineController, updateMedicineController } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post('/add-medicine',checkUserLogin,isAdmin, addMedicineController);
adminRouter.get('/getallmedicine', getAllMedicineController);
adminRouter.put('/medicine/:itemCode',checkUserLogin,isAdmin, updateMedicineController);
adminRouter.delete('/delete/:itemCode',checkUserLogin,isAdmin, deleteMedicineController);



export default adminRouter;