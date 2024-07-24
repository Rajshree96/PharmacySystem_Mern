import express from "express";
import { createTransaction, deleteTransaction, getAllTransactions } from "../controllers/bankTransactionController.js";

const transactionRouter = express.Router();


transactionRouter.post("/add", createTransaction)
transactionRouter.get("/getAll", getAllTransactions)
transactionRouter.delete("/delete/:id", deleteTransaction)

export default transactionRouter;
