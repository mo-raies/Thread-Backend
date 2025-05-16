
import express from "express"
import connectDB from "./utils/Database.js"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoute from "./routes/userRoute.js"
import threadRoute from "./routes/threadRoute.js"



dotenv.config();

const app = express();
connectDB();

//Middleware
app.use(cors());
app.use(express.json()); // <== Important: parse JSON bodies
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());



app.get("/", (req,res) => {
res.status(200).json({
  message: "Backend Running Successfully",
  success: true
})
})

//route
app.use("/api/v1/user",userRoute);
app.use("/api/v1/thread",threadRoute)


//start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})