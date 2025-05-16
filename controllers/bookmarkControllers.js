import mongoose from "mongoose";
import { Bookmark } from "../models/bookmarkModel.js";

import { Thread } from "../models/threadModel.js";

export const bookmark = async(req,res) => {
  try {
    const userId = req.user._id; //user ke id 
    const threadId = req.params.threadId ; // thread ke id 

    if(!mongoose.Types.ObjectId.isValid(threadId)){
      return res.status(400).json( {success: "false", message: "Invalid thread ID"})
    }

    const thread = await Thread.findById(threadId)
    if(!thread){
      return res.status(400).json({message: "thread not found" ,success: "false"})
    }

    const existingBookmark = await Bookmark.findOne({user: userId , thread: threadId})

    if(existingBookmark){
      await Bookmark.deleteOne({_id:existingBookmark._id})
      return res.status(200).json({success: "true", message:"Bookmark removed"})
    }
     else {
    const newBookmark = await Bookmark.create({user: userId , thread: threadId})
    return res.status(200).json({
      success: "true",
      message: "Bookmark is added",
      data: newBookmark
     })
    }

 } catch (error) {
    console.log("Bookmark is wrong",error)
    return res.status(500).json({success: false, message: "Bookmark is went wrong"})
  }
}