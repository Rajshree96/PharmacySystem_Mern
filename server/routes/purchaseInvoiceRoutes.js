import express from 'express';

import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';
import { addPurchaseInvoice, deletePurchaseInvoice, getAllPurchasesInvoice, updatePurchaseInvoice } from '../controllers/purchaseInvoiceController.js';

const purchaseInvoiceRoute = express.Router();

// Purchase routes
purchaseInvoiceRoute.post('/add', checkUserLogin, isAdmin, addPurchaseInvoice);
purchaseInvoiceRoute.get('/getAll', checkUserLogin, isAdmin, getAllPurchasesInvoice);
purchaseInvoiceRoute.put('/edit/:id', checkUserLogin, isAdmin, updatePurchaseInvoice);
purchaseInvoiceRoute.delete('/delete/:id', checkUserLogin, isAdmin, deletePurchaseInvoice);

export default purchaseInvoiceRoute;
