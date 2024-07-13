import express from 'express';
import salesEstimate from '../controllers/salesEstimateController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';

const salesRouter = express.Router();

salesRouter.post('/sales-estimates', checkUserLogin, isAdmin,salesEstimate.create);
salesRouter.get('/sales-estimate', salesEstimate.getAll);
salesRouter.put('/sales-estimate-edit/:id', salesEstimate.edit);
salesRouter.delete('/sales-estimate-delete/:id', salesEstimate.delete);
export default salesRouter;