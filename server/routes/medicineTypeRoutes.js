import express from 'express';
import { addmedicineType, getAll, editMedicineType, deleteMedicineType } from '../controllers/medicineTypeController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';

const medicineRouter = express.Router(); // Corrected name

// Route to add a new category
medicineRouter.post('/add', checkUserLogin, isAdmin, addmedicineType);
medicineRouter.get('/getall', checkUserLogin, isAdmin, getAll);

// Route to edit an existing category
medicineRouter.put('/edit/:id', checkUserLogin, isAdmin, editMedicineType);

// Route to delete a category
medicineRouter.delete('/delete/:id', checkUserLogin, isAdmin, deleteMedicineType);

export default medicineRouter; // Corrected name
