import express from 'express';
import purchaseReturnController from '../controllers/purchaseReturnController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';

const purchaseRouter = express.Router();

// Route to create a new purchase return
purchaseRouter.post('/add-purchase-return',checkUserLogin, isAdmin, purchaseReturnController.create);

export default purchaseRouter;
