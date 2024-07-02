import express from 'express';
import { addBusinessSetup } from '../controllers/businessSetupController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';


const router = express.Router();

//route to add a new businsess setup 

router.post('/add', checkUserLogin , isAdmin,  addBusinessSetup);

export default router;
