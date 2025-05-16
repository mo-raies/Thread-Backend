import mongoose from "mongoose";

const likeModel = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
   profilephoto: {
    type: String, // This stores the profile photo URL
    required: true
  }
},{timestamps:true});
export const Like = mongoose.model("Like",likeModel)