import express from 'express';
import mongoose from 'mongoose';

import User from '../models/User.js'


const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const Posts = await User.find();
                
        res.status(200).json(Posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createUser = async (req, res) => {
    const user = req.body;
    console.log(user)
    const newUser = new User(user)

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409),json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, posts, friends, friend_requests, profile_image  } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedUser = { creator, title, message, tags, selectedFile, _id: id };

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
}


export const LoginUser = async (req, res) => {
    const user = req.body;
    console.log(user)

    User.exists({ email: user.email, password: user.password }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
      
    //res.status(200).json(user);

    
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
}





//export const deletePost = async (req, res ) => {
//   const {id} = req.params;
//
//  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
//
//    await Post.findByIdAndRemove(id);
//
//    res.json({ message: "post deleted "})
//}


//export const likePost = async (req, res) => {
//    const { id } = req.params;
//
//    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
//    
//    const post = await Post.findById(id);
//
//    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
//    
//    res.json(updatedPost);
//}

