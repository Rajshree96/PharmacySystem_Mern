import express from "express";


import { getExpiredMedicinesCount } from "../controllers/adminController.js";
import { checkUserLogin, isAdmin } from "../middlewares/middleware.js";

const expireyRouter = express.Router();

expireyRouter.get('/expired-medcine-count', checkUserLogin, isAdmin,getExpiredMedicinesCount);


  export default expireyRouter;
