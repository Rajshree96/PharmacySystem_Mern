import express from "express";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";
import { addManufacturerController, addManufacturerLedgerController, addMedicineController, addSupplierController, 
    addSupplierLedgerController, 
    deleteManufacturerController, deleteManufacturerLedgerController, deleteMedicineController, deleteSupplierController, 
    deleteSupplierLedgerController, 
    getAllManufacturerController, getAllManufacturerLedgerController, getAllMedicineController, getAllSupplierController, 
    getAllSupplierLedgerController, 
    updateManufacturerController, updateManufacturerLedgerController, updateMedicineController, updateSupplierController, 
    updateSupplierLedgerController
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
adminRouter.put('/update/manufacturer/:_id',checkUserLogin,isAdmin,updateManufacturerController);
adminRouter.delete('/delete/manufacturer/:_id',checkUserLogin,isAdmin,deleteManufacturerController);

//routes related to suppliers
adminRouter.post('/add-supplier',checkUserLogin,isAdmin, addSupplierController);
adminRouter.get('/getAllSupplier',checkUserLogin,isAdmin, getAllSupplierController);
adminRouter.put('/update/supplier/:_id',checkUserLogin,isAdmin,updateSupplierController);
adminRouter.delete('/delete/supplier/:_id',checkUserLogin,isAdmin,deleteSupplierController);

//routes related to manufacturer ledger
adminRouter.post('/add-manufacturerLedger',checkUserLogin,isAdmin, addManufacturerLedgerController);
adminRouter.get('/getAllManufacturerLedger',checkUserLogin,isAdmin, getAllManufacturerLedgerController);
adminRouter.put('/manufacturerLedger/:_id',checkUserLogin,isAdmin,updateManufacturerLedgerController);
adminRouter.delete('/manufacturerLedger/:_id',checkUserLogin,isAdmin,deleteManufacturerLedgerController);

// routes related to supplier ledger 

adminRouter.post('/add-supplierLedger',checkUserLogin,isAdmin, addSupplierLedgerController);
adminRouter.get('/getAllSupplierLedger',checkUserLogin,isAdmin, getAllSupplierLedgerController);
adminRouter.put('/supplierLedger/:_id',checkUserLogin,isAdmin,updateSupplierLedgerController);
adminRouter.delete('/supplierLedger/:_id',checkUserLogin,isAdmin,deleteSupplierLedgerController);


export default adminRouter;