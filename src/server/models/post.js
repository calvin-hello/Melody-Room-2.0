import mongoose from "mongoose"

const postSchema = new mongoose.Schema()

const Post = mongoose.model("Post", postSchema)

export default Post

/* From taiti101 code */
