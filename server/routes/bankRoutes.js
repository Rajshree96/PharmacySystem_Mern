import express from "express";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";
import { addBank, deleteBank, editBank, getAllBanks } from "../controllers/bankController.js";

const bankRouter = express.Router();

//add bank 
bankRouter.post("/add-bank", checkUserLogin, isAdmin, addBank);
bankRouter.get("/getAllBank", checkUserLogin, isAdmin, getAllBanks);
bankRouter.put("/editBank/:id", checkUserLogin, isAdmin, editBank);
bankRouter.delete("/deleteBank/:id", checkUserLogin, isAdmin, deleteBank);

export default bankRouter;
