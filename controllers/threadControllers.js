import { Thread } from "../models/threadModel.js";

export const createThread = async(req,res) => {
  try {
    const {title, content, tags, imgSrc} = req.body;
    const userId = req.user._id; // Assuming auth middleware adds user to req

    const newThread = await Thread.create({
      title,
      content,
      tags,
      imgSrc,
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
