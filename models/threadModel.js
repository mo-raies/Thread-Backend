import mongoose from "mongoose";

const threadModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // trim: true
  },
  content: {
    type: String,
    required: true
  },
  imgSrc : {
    type: String,
    default: ""
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
},
{timestamps:true});

export const Thread = mongoose.model("Thread",threadModel)
