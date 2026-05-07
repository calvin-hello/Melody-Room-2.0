import mongoose from "mongoose"

const artistSchema = new mongoose.Schema()

const Artist = mongoose.model("Artist", artistSchema)

export default Artist