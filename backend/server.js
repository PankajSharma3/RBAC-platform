import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectMongoDB from "./database/connect.js";
import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

const PORT = (process.env.PORT) || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
    connectMongoDB();
});