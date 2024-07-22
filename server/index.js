import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import businessSetupRoutes from './routes/businessSetupRoutes.js';
import medicineRouter from "./routes/medicineTypeRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import cutomerRouter from "./routes/cutomerRoutes.js";
import purchaseRoute from "./routes/purchaseRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import purchaseRouter from "./routes/purchaseReturnRoutes.js";
import bankRouter from "./routes/bankRoutes.js";
import cashRouter from "./routes/cashRoutes.js";
import salesRouter from "./routes/salesEstimateRoutes.js";
import salesInvoice from "./routes/salesRoutes.js";
import deliveryChallanRouter from "./routes/deliveryChallanRoutes.js";
import salesReturnRouter from "./routes/salesReturnRoutes.js";
import posRouter from "./routes/posRoutes.js";
import incomeRouter from "./routes/incomeRoutes.js";
import guiRouter from "./routes/guiRoutes.js";
import payInRouter from "./routes/payInRoutes.js";
import payOutRouter from "./routes/payOutRoutes.js";
import expenseRouter from "./routes/expenseRoutes.js";
import fixedAssetsRouter from "./routes/fixedAssetsRoutes.js";
import journalRouter from "./routes/journalRouter.js";
import transactionRouter from "./routes/bankTransactionRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

//server static fies from the public folder
app.use(express.static('public'));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/unit", unitRoutes);
app.use('/api/v1/business-setup', businessSetupRoutes);
app.use('/api/v1/medicine-type', medicineRouter);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/customer", cutomerRouter);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/purchase-retrun", purchaseRouter);
app.use("/api/v1/bank", bankRouter);
app.use("/api/v1/cash", cashRouter);
app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/salesinvoice", salesInvoice);
app.use("/api/v1/deliveryChallan", deliveryChallanRouter);
app.use("/api/v1/salesreturn", salesReturnRouter);
app.use("/api/v1/pos", posRouter);
app.use("/api/v1/income", incomeRouter);
app.use('/api/v1/gui',guiRouter);
app.use('/api/v1/payin',payInRouter);
app.use('/api/v1/payout',payOutRouter);
app.use('/api/v1/expense', expenseRouter);
app.use('/api/v1/fixedassets', fixedAssetsRouter);
app.use('/api/v1/journal', journalRouter);
app.use('/api/v1/transaction', transactionRouter);



const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})