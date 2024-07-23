import express from "express";
import { createTransaction, getAllTransactions } from "../controllers/bankTransactionController.js";

const transactionRouter = express.Router();


transactionRouter.post("/add", createTransaction)
transactionRouter.get("/getAll", getAllTransactions)

export default transactionRouter;
