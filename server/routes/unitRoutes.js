import express from 'express';
import { addUnit, editUnit, deleteUnit, getAllUnits } from '../controllers/unitController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';

const router = express.Router();

// Route to add a new unit
router.post('/add', checkUserLogin, isAdmin,  addUnit);

// Route to get all units
router.get('/all',checkUserLogin, isAdmin,  getAllUnits);

// Route to edit an existing unit
router.put('/edit/:id',checkUserLogin, isAdmin,  editUnit);

// Route to delete a unit
router.delete('/delete/:id', checkUserLogin, isAdmin,  deleteUnit);

export default router;
