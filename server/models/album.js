import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
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

    coverImage: {
        type: String,
        default: "",
    },

    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
    }],

    genre: {
        type: String,
        default: "Unknown",
    },

    releaseDate: {
        type: Date,
    },

    totalTracks: {
        type: Number,
        default: 0,
    },

    duration: {
        type: Number, // total seconds
        default: 0,
    },

    likes: {
        type: Number,
        default: 0,
    }
})

const Album = mongoose.model("Album", albumSchema)

export default Album
