import express from 'express';
import { addBusinessSetup } from '../controllers/businessSetupController.js';


const router = express.Router();

//route to add a new businsess setup 

router.post('/add',  addBusinessSetup);

export default router;
