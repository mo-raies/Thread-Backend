import { Thread } from "../models/threadModel.js";
import mongoose from "mongoose";

export const createThread = async(req,res) => {
  try {
    const {title, content, tags, imgSrc} = req.body;
    const userId = req.user._id; // Assuming auth middleware adds user to req

    const imageUrl = req.file?.path || ""; // Cloudinary URL

    const newThread = await Thread.create({
      title,
      content,
      tags: Array.isArray(tags) ? tags : tags.split(','),
      imgSrc: imageUrl, // Cloudinary image URL
      createdBy: userId
    });

    res.status(201).json({
      success: true,
      message: "Thread created successfully",
      data: newThread
    });
  } catch (error) {
    
    res.status(400).json({
      success: false,
      message: "Failed to create thread",
      error: error.message
    });
  }
  }
export const getAllThreads = async(req,res) => {
  try {
    const threads = await Thread.find().sort({createdAt: -1})
    return res.status(200).json(threads)

  } catch (error) {
    console.error('Error fetching All threads:', error);
     return res.status(500).json({ message: 'Failed to getALLthreads' });
  }
  
}
export const getThreadbyId = async(req,res) => {
  try {
    const {id} = req.params; 
    const thread = await Thread.findById(id)

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    return res.status(200).json(thread)

  } catch (error) {
    console.log("fetching error byThreadId",error)
    return res.status(500).json({message:"fetching error byThreadId"})
  }
}
export const updateThread = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid thread ID" });
    }
    const { title, content, imgSrc, tags } = req.body;

    const updateData = { title, content, imgSrc, tags };

    const updatedThread = await Thread.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedThread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    return res.status(200).json(updatedThread);
  } catch (error) {
    console.error("Error updating thread:", error);
    return res.status(500).json({ message: "Failed to update thread" });
  }
};
export const deleteThread = async (req,res) => {
  try {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"Invalid Thread Id"})
    }
    const deletedThread = await Thread.findByIdAndDelete(id);

    if(!deletedThread){
      return res.status(404).json({message: "Thread is not delete"})
    }

    return res.status(200).json({message: "Thread delete is successfully"})
  } catch (error) {
    console.log("error deleting thread:",error)
    return res.status(500).json({message: "failed to delete thread"})
  }
}
export const getThreadsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userThreads = await Thread.find({createdBy: userId });

    return res.status(200).json(userThreads);
  } catch (error) {
    console.error("Error fetching threads by user:", error);
    return res.status(500).json({ message: "Failed to fetch threads by user" });
  }
};