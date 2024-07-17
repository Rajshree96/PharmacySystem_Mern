import express from "express";
import { addPayIn } from "../controllers/payInController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";

const payInRouter = express.Router();


payInRouter.post("/pay", checkUserLogin, isAdmin,addPayIn);

export default payInRouter;
