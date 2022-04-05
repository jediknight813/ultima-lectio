import express from 'express';
import mongoose from 'mongoose';
import bycypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import json from 'body-parser';



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
    const {email, password, username} = req.body;
    //console.log("here")
    try {
        const existingUser =  await User.findOne({ email });

        if (existingUser) return res.status(400).json({message: "user exists"})

        const hashedPassword = await bycypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, username})

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "10h"})

        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({message: " something went wrong "})
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
    const { email, password } = req.body;

    //console.log(req.body)

    try {
        const existingUser =  await User.findOne({ email });

        if (!existingUser) return res.status(404).json({message: "user not found"})
        
        const isPasswordCorrect = await bycypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(404).json({message: "invaild password"})


        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "10h"})
        
        console.log(token)

        res.status(200).json({ result: existingUser, token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: " something went wrong "})
    }

}
      
    //res.status(200).json(user);

    
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);






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
