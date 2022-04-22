import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    _id: String,
    email: String,
    username: String,
    password: String,
    posts: Array,
    friends: Array,
    profile_image: String,
    notifications: Array,
    bookmarked_posts: Array
})


const User = mongoose.model('User', userSchema);
export default User;

