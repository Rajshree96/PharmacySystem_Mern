import express from 'express';

import { addIncome } from '../controllers/incomeController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';

const incomeRouter = express.Router();


incomeRouter.post("/add", checkUserLogin, isAdmin, addIncome);

export default incomeRouter;
