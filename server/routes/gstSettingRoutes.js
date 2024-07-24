import express from "express"
import { createGstName, createTaxRate, deleteTaxRate, deleteTaxType, getAllGstSettings, getAllTaxRates, updateGstName, updateTaxRate } from "../controllers/gstSettingController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";

const gstSettingRouter = express.Router();


gstSettingRouter.post("/addgstType", checkUserLogin, isAdmin,createGstName);
gstSettingRouter.post("/addtaxrate", checkUserLogin, isAdmin,createTaxRate);
gstSettingRouter.put("/editgst/:id", checkUserLogin, isAdmin,updateGstName);
gstSettingRouter.delete("/deletegst/:id", checkUserLogin, isAdmin,deleteTaxType);
gstSettingRouter.delete("/deleteTaxRate/:id", checkUserLogin, isAdmin,deleteTaxRate);
gstSettingRouter.put("/edittaxrate/:id", checkUserLogin, isAdmin,updateTaxRate);
gstSettingRouter.get("/getAllgst", checkUserLogin, isAdmin,getAllGstSettings);
gstSettingRouter.get("/getAllTaxRate", checkUserLogin, isAdmin,getAllTaxRates);


export default gstSettingRouter;




