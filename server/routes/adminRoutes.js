import express from "express";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";
import { addManufacturerController, addMedicineController, addSupplierController, 
    deleteManufacturerController, deleteMedicineController, deleteSupplierController, 
    getAllManufacturerController, getAllMedicineController, getAllSupplierController, 
    updateManufacturerController, updateMedicineController, updateSupplierController 
} 
    from "../controllers/adminController.js";

const adminRouter = express.Router();
// routes related to medicine
adminRouter.post('/add-medicine',checkUserLogin,isAdmin, addMedicineController);
adminRouter.get('/getallmedicine', getAllMedicineController);
adminRouter.put('/medicine/:itemCode',checkUserLogin,isAdmin, updateMedicineController);
adminRouter.delete('/delete/:itemCode',checkUserLogin,isAdmin, deleteMedicineController);

//routes related to manufacturer
adminRouter.post('/add-manufacturer',checkUserLogin,isAdmin, addManufacturerController);
adminRouter.get('/getAllManufacturer',checkUserLogin,isAdmin, getAllManufacturerController);
adminRouter.put('/manufactuer/:_id',checkUserLogin,isAdmin,updateManufacturerController);
adminRouter.delete('/manufacturer/:_id',checkUserLogin,isAdmin,deleteManufacturerController);

//routes related to suppliers
adminRouter.post('/add-supplier',checkUserLogin,isAdmin, addSupplierController);
adminRouter.get('/getAllSupplier',checkUserLogin,isAdmin, getAllSupplierController);
adminRouter.put('/supplier/:_id',checkUserLogin,isAdmin,updateSupplierController);
adminRouter.delete('/supplier/:_id',checkUserLogin,isAdmin,deleteSupplierController);


export default adminRouter;