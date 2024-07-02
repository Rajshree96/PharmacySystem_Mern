import express from 'express';
import { addCategory, getAllCategory, editCategory, deleteCategory } from '../controllers/categoryController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';

const router = express.Router();

// Route to add a new category
router.post('/add',checkUserLogin,isAdmin, addCategory);
router.get('/getall',checkUserLogin,isAdmin, getAllCategory);

// Route to edit an existing category
router.put('/edit/:id',checkUserLogin,isAdmin, editCategory);

// Route to delete a category
router.delete('/delete/:id',checkUserLogin,isAdmin, deleteCategory);

export default router;
