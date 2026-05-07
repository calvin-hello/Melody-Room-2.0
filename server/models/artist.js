import mongoose from "mongoose"

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    bio: {
        type: String,
        default: "",
        maxlength: 20,
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
})

const Artist = mongoose.model("Artist", artistSchema)

export default Artist