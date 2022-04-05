import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title: String,
    message: String,
    username: String,
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