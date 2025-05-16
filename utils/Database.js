import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({path:'.env'})


// const PORT = process.env.PORT || 5000

const connectDB = async() => {
try {
  await mongoose.connect(process.env.MONGO_URI).then( () => {
    console.log("Database connected !!")
  })

  
} catch (error) {
  console.log("MongoDB Connection Failed",error.message)
}
}

export default connectDB; 