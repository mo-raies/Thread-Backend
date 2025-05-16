import mongoose from "mongoose";
import { Like,} from "../models/likeModel.js";
import { Thread } from "../models/threadModel.js";
import { User } from "../models/userModel.js";

export const getLikesByThread = async(req,res) => {
  try {
    const {threadId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(threadId)){
      return res.status(400).json({message: "Invalid Thread ID"})
    }
   const likes = await Like.find({ threadId }).populate("likedBy", "username profilephoto");

    return res.status(200).json({
      totalLikes: likes.length,
      likedByUsers: likes.map(like => like.likedBy)
    })
  } catch (error) {
    console.error("Error fetching likes:", error);
    return res.status(500).json({ message: "Failed to fetch likes" });
  }
};
export const toggleLike = async (req, res) => {
  try {
    const { threadId } = req.params;
    const userId = req.user._id; 

    const existingLike = await Like.findOne({ threadId, likedBy: userId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      return res.status(200).json({ message: "Thread unliked" });

    } else {
      const newLike = await Like.create({ threadId, likedBy: userId });
      return res.status(201).json({ message: "Thread liked", like: newLike });
    }
  } catch (error) {
    console.error("Toggle like error:", error);
    return res.status(500).json({ message: "Failed to like/unlike" });
  }
}
export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;  //loged in user ke id 
    const threadId = req.params.threadId; //thread id jo hm like kre ge 

    if (!mongoose.Types.ObjectId.isValid(threadId)) { 
      return res.status(400).json({
        success: false,
        message: "Invalid thread ID format.",
      });
    }

    const thread = await Thread.findById(threadId);
    if (!thread) {
      return res.status(404).json({
        success: false,
        message: "Thread not found.",
      });
    }
    //like when
    const existingLike = await Like.findOne({ 
      threadId,
      likedBy: loggedInUserId
    });

    if (existingLike) {
      // Remove like
      await Like.deleteOne({ _id: existingLike._id });
      return res.status(200).json({
        success: true,
        message: "User disliked the thread.",
      });
    } else {
      // Get user details to extract profilePhoto
      const user = await User.findById(loggedInUserId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
      // Save like with profile photo
      await Like.create({
        threadId,
        likedBy: loggedInUserId,
        profilephoto: user.profilephoto
      });

      return res.status(200).json({
        success: true,
        message: "User liked the thread.",
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
