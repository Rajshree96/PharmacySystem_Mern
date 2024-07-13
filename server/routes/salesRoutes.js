import express from "express";
import { createSalesInvoice, deleteSalesInvoiceById, getAllSalesInvoices, updateSalesInvoiceById } from "../controllers/salesInvoiceController.js";

const salesInvoice = express.Router();

salesInvoice.post("/addSalesInvoice", createSalesInvoice);
salesInvoice.get('/getAll', getAllSalesInvoices);
// salesInvoice.get('/:id', getSalesInvoiceById);
salesInvoice.put('/edit/:id', updateSalesInvoiceById);
salesInvoice.delete('/delete/:id', deleteSalesInvoiceById);


export default salesInvoice;
