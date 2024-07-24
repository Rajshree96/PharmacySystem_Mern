import express from "express";
import {createPOs, getAllPOs } from "../controllers/posController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";

const posRouter = express.Router();

posRouter.post("/addpos", checkUserLogin, isAdmin, createPOs);
posRouter.get("/getall", checkUserLogin, isAdmin,getAllPOs);

export default posRouter;
