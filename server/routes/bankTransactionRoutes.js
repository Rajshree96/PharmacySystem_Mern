import express from "express";
import { createTransaction } from "../controllers/bankTransactionController.js";

const transactionRouter = express.Router();


transactionRouter.post("/add", createTransaction)

export default transactionRouter;
