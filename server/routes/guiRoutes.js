import express from "express";
import { createGUI } from "../controllers/guiController.js";


const guiRouter = express.Router();

guiRouter.post("/addgui", createGUI);

export default guiRouter;
