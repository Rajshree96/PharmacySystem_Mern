import express from "express";
import { addExpense } from "../controllers/expenseController.js";

const expenseRouter = express.Router();


expenseRouter.post("/add", addExpense);

export default expenseRouter;
