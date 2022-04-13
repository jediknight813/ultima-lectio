import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    _id: String,
    message: String,
    username: String,
    creator: String,
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})


const Post = mongoose.model('Post', postSchema);
export default Post;