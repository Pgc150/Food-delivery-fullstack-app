import "./config/loadEnv.js";

import express from "express"


import fs from "fs";

console.log("ENV FILE EXISTS:", fs.existsSync(".env"));
console.log("JWT:", process.env.JWT_SECRET);


import cors from "cors"
import { connect } from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import chatRoute from "./routes/chatRoute.js";


// connection string = mongodb+srv://payalchavhan:<db_password>@cluster0.ikmor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// app config
const app = express()
const port = 4000;

// middleware
app.use(express.json())
app.use(cors())

// db connection
 connectDB();



// api endpoints 
app.use("/api/food",foodRouter);
app.use("/uploads",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api",chatRoute)


app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})



//mongodb+srv://payalchavhan180_db_user:30052003@cluster2.vs0vi1u.mongodb.net/?