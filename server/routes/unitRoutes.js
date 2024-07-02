import express from 'express';
import { addUnit, editUnit, deleteUnit, getAllUnits } from '../controllers/unitController.js';

const router = express.Router();

// Route to add a new unit
router.post('/add', addUnit);

// Route to get all units
router.get('/all', getAllUnits);

// Route to edit an existing unit
router.put('/edit/:id', editUnit);

// Route to delete a unit
router.delete('/delete/:id', deleteUnit);

export default router;
