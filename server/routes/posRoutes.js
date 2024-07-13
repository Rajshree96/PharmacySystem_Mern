import express from "express";
import {createPOs } from "../controllers/posController.js";

const posRouter = express.Router();

posRouter.post("/addpos", createPOs);

export default posRouter;
