import express from 'express';
import { addBusinessSetup, getBusinessLogoController, getBusinessSetup } from '../controllers/businessSetupController.js';
import { checkUserLogin, isAdmin } from '../middlewares/middleware.js';


const router = express.Router();

//route to add a new businsess setup 

// Corrected route definition
router.post('/add',checkUserLogin, isAdmin,addBusinessSetup);
router.get('/get', checkUserLogin, isAdmin, getBusinessSetup);
router.get('/get-businesslogo',getBusinessLogoController);

export default router;
