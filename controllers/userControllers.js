import {User,} from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async(req,res) => {
  console.log("req.body:", req.body);
  try {
    const {fullname,username,password,gender} = req.body

    if(!fullname || !username || !password || !gender){
      return res.status(400).json({message:"All fileds are required "})
    }
    const user = await User.findOne({username})
    if(user){
      return res.status(400).json({message:"username is already exist"})
    }
    const hasedpassword = await bcrypt.hash(password,10)
    

     // profilePhoto
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
          fullname,
          username,
          password: hasedpassword,
          gender,
          profilephoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto ,
        })

        return res.status(200).json({message: "Account successfully created"})

  } catch (error) {
    console.log("user registration  error :", error)
    return res.status(500).json({message: "user registration failed"})
  }
}

export const login = async(req,res) => {
  try {
    const {username, password} = req.body;
    if(!username || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    const user = await User.findOne({username})

     if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };

    const isPasswordMatch = await bcrypt.compare(password,user.password) 

    if(!isPasswordMatch){
      return res.status(400).json({message:"Incorrect username or password", success: false })
    }   

    const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: true, 
            sameSite: "None", 
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
          }).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePhoto: user.profilephoto
        });

  } catch (error) {
    console.log(error)
  }
}

export const logout = async(req,res) => {
 try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "user logged in error"})
    }
}
