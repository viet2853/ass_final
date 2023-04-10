import express from "express";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import authRouter from "./routers/auth";
import userRouter from "./routers/user";
import cors from "cors";
import mongoose from "mongoose";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/ass_fn")
  .then(console.log("Connect success"));

export const viteNodeApp = app;
