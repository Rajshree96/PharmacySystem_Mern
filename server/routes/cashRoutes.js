import express from "express";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";
import { addCash, deleteCash, getAll, updateCash } from "../controllers/cashController.js";

const cashRouter = express.Router();

//add cash 
cashRouter.post("/addcash", checkUserLogin, isAdmin, addCash);
cashRouter.get("/getAll",checkUserLogin, isAdmin, getAll );
cashRouter.put("/edit/:id",checkUserLogin, isAdmin, updateCash);
cashRouter.delete("/delete/:id",checkUserLogin, isAdmin, deleteCash);


export default cashRouter;

