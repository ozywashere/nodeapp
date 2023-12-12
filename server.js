import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import dotenv from "dotenv";
const app=express();
dotenv.config({path:"./.env"});
import connectDB from "./config/connectDB.js";
import tourRouter from "./routes/tourRoutes.js";


//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//routes
app.get("/",(req,res)=>{
  res.send("API is running")
})

//routes middleware
app.use("/api/v1/tours",tourRouter);


//error handling middleware
app.use(globalErrorHandler);
app.all("*",(req,res,next)=>{
  next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
})
//connect to database
const PORT=process.env.PORT||9000;
app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
  connectDB();
})
