import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/user',userRouter)
app.use('/admin',adminRouter)
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})