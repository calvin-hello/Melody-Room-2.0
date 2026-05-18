// Comment model — the blueprint for a single comment in MongoDB.
// Kept simple so it works with the current mock posts (which use plain
// number IDs) and doesn't require auth tokens to test.
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // Which post this comment belongs to.
    // Stored as a string so it works with both mock IDs ("1", "2", ...)
    // and real MongoDB ObjectIds later on.
    postId: {
      type: String,
      required: true,
    },

    // Who wrote the comment — saved as a username string for now.
    author: {
      type: String,
      required: true,
    },

    // The comment text itself
    text: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    // Adds createdAt + updatedAt fields automatically
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
