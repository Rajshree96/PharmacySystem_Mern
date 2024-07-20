import express from 'express';
import salesEstimate, { deleteSalesEstimate, getSalesEstimate, updatedSalesEstimate } from '../controllers/salesEstimateController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';

const salesRouter = express.Router();

salesRouter.post('/sales-estimates', checkUserLogin, isAdmin, salesEstimate);
salesRouter.get('/getAll',checkUserLogin, isAdmin, getSalesEstimate);
salesRouter.put('/edit/:id',checkUserLogin,isAdmin, updatedSalesEstimate);
salesRouter.delete('/delete/:id', checkUserLogin, isAdmin, deleteSalesEstimate);

export default salesRouter;