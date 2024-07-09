import express from "express";

import { addBrand, getAllBrands, deleteBrand, editBrand } from "../controllers/brandController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";

const brandRoutes = express.Router();


brandRoutes.post("/add", checkUserLogin, isAdmin,  addBrand);
brandRoutes.get("/getAll", checkUserLogin, isAdmin,getAllBrands);
brandRoutes.put("/edit/:id",checkUserLogin,isAdmin, editBrand);
brandRoutes.delete("/delete/:id", checkUserLogin, isAdmin, deleteBrand);


export default brandRoutes;

