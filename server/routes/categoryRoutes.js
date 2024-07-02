import express from 'express';
import { addCategory, getAllCategory, editCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

// Route to add a new category
router.post('/add', addCategory);
router.get('/getall', getAllCategory);

// Route to edit an existing category
router.put('/edit/:id', editCategory);

// Route to delete a category
router.delete('/delete/:id', deleteCategory);

export default router;
