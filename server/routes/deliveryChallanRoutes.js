import express from "express";
import { createDeliveryChallan, deleteDeliveryChallan, editDeliveryChallan, getAllDeliveryChallans } from "../controllers/delivdryChalanController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";

const deliveryChallanRouter = express.Router();

deliveryChallanRouter.post("/addChallan",checkUserLogin,isAdmin, createDeliveryChallan)
deliveryChallanRouter.get("/getAll",checkUserLogin, isAdmin, getAllDeliveryChallans)
deliveryChallanRouter.put("/edit/:id",checkUserLogin, isAdmin, editDeliveryChallan)
deliveryChallanRouter.delete("/delete/:id",checkUserLogin, isAdmin, deleteDeliveryChallan)

export default deliveryChallanRouter;
