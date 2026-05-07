import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "authorType",
    required: true,
  },

  authorType: {
    type: String,
    enum: ["User", "Artist"],
    required: true,
  },

<<<<<<< HEAD
export default Post

/* From taiti101 code */
=======
  content: {
    type: String,
    required: true,
    maxlength: 1000,
  },

  image: {
    type: String,
    default: "",
  },

  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
  },

  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],

  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    text: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],

  tags: [{
    type: String,
  }],

}, {
  timestamps: true,
});

export default mongoose.model("Post", postSchema);
>>>>>>> d02c3eb317087e4eb7aa2b7b671e2aa67b0b2620
