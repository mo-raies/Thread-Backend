import mongoose from "mongoose";

const userModel = new mongoose.Schema( 
  {
    fullname:{
      required: true,
      type: String
    },
    username: {
      required: true,
      type: String,
      unique: true
    },
     password:{
        type:String,
        required:true
    },
    profilephoto: {
      type: String,
      default: ""
    },
    gender: {
      type: String,
      enum:["male","female"],
      required: true
    }
  },

  {timestamps:true})
export const User = mongoose.model("User", userModel)

  




