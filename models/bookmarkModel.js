import mongoose from "mongoose";

export const bookmarkModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  },
  {timestamps: true})
  export const Bookmark = mongoose.model("Bookmark",bookmarkModel)