import express from "express";
import { addPayOut } from "../controllers/payOutController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";

const payOutRouter = express.Router();


payOutRouter.post("/add", checkUserLogin, isAdmin,  addPayOut);

export default payOutRouter;
