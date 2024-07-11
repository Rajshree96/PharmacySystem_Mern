import express from 'express';
import { addCustomer, editCustomer , getAllCustomers, deleteCustomer } from '../controllers/customerController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';

const cutomerRouter = express.Router();

// Route to add a new category
cutomerRouter.post('/add',checkUserLogin,isAdmin, addCustomer);
cutomerRouter.get('/getall',checkUserLogin,isAdmin, getAllCustomers);

// Route to edit an existing category
cutomerRouter.put('/edit/:id',checkUserLogin,isAdmin, editCustomer);

// Route to delete a category
cutomerRouter.delete('/delete/:id',checkUserLogin,isAdmin, deleteCustomer);

export default cutomerRouter;
