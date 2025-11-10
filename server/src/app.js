import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";


import authRoutes from "../src/routes/authRoutes.js";
import productRoutes from "../src/routes/productRoutes.js"


dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes)


app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running successfully on http://localhost:${PORT}`);
});

export default app;
