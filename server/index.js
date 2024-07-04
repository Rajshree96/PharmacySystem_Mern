import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import businessSetupRoutes from './routes/businessSetupRoutes.js';

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


const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})