import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    posts: Array,
    friends: Array,
    friend_requests: Array,
    profile_image: String
})


const User = mongoose.model('User', userSchema);
export default User;

