import express from "express";
import { addFixedAsset } from "../controllers/fixedAssetsController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";

const fixedAssetsRouter = express.Router();


fixedAssetsRouter.post("/add",checkUserLogin,isAdmin,addFixedAsset );

export default fixedAssetsRouter;
