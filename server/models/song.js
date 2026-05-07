import mongoose from "mongoose"

const songSchema = new mongoose.Schema({
     title: {
    type: String,
    required: true,
    trim: true,
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },

  duration: {
    type: Number, // seconds
    required: true,
  },

  audioUrl: {
    type: String,
    required: true,
  },

  coverImage: {
    type: String,
    default: "",
  },

  genre: {
    type: String,
    default: "Unknown",
  },

  plays: {
    type: Number,
    default: 0,
  },

  likes: {
    type: Number,
    default: 0,
  },

  releaseDate: {
    type: Date,
  },

  explicit: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,

})

const Song = mongoose.model("Song", songSchema)

export default Song