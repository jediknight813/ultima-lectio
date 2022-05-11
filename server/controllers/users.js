import express from 'express';
import mongoose from 'mongoose';
import bycypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import json from 'body-parser';
import DefaultImage from '../images/DefaultImage.js';


const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const Posts = await User.find();
                
        res.status(200).json(Posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const SignInGoogleUser = async (req, res) => {
    const googleId = req?.body?.googleId
    

    try {
        const existingUser =  await User.findOne({ _id: googleId });

       if (existingUser) {        
            const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "10h"})
           
            res.status(200).json({ result: existingUser, token})

       } else {
           const result = await User.create({email: req?.body?.email, username: req?.body?.name, _id: googleId, profile_image: req?.body?.imageUrl})

           const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "10h"})
   
           res.status(200).json({ result, token })

       }

    } catch (error) {
        res.status(500).json({message: " something went wrong "})
    }
}



export const createUser = async (req, res) => {
    const {email, password, username} = req.body;
    let random_string = Math.random().toString(30).substring(3,29)
    try {
        const existingUser =  await User.findOne({ email });

        if (existingUser) return res.status(400).json({message: "user exists"})

        const hashedPassword = await bycypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, username, _id: random_string, profile_image: DefaultImage()})

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

    try {
        const existingUser =  await User.findOne({ email });

        if (!existingUser) return res.status(404).json({message: "user not found"})
        
        const isPasswordCorrect = await bycypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(404).json({message: "invaild password"})


        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "10h"})
        
        res.status(200).json({ result: existingUser, token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: " something went wrong "})
    }

}



export const getUser = async (req, res) => {
    const { id } = req.params;
    if (!await User.findById(id));

    const user = await User.findById(id);
    res.json(user);
} 

export const updateUserAboutMe = async (req, res) => {
    const { id, message } = req.body;
    if (!await User.findById(id));
    const user = await User.findByIdAndUpdate(id,  { about_me: message }, { new: true });
}

export const updateUserProfileImage = async (req, res) => {
    const { id, image } = req.body;
    if (!await User.findById(id));
    const user = await User.findByIdAndUpdate(id,  { profile_image: image }, { new: true });

}



export const bookmarkPost = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) return res.json({message: 'Unauthenticated'})
    if (!await User.findById(req.userId));
    const user = await User.findById(req.userId);

    if (user.bookmarked_posts.includes(id) === true) {
        const updatedUser = await User.findByIdAndUpdate(req.userId,  { $pull: { bookmarked_posts: id } }, { new: true });
        res.json(updatedUser);
    }
    else {
        const updatedUser = await User.findByIdAndUpdate(req.userId,  { $addToSet: { bookmarked_posts: id } }, { new: true });
        res.json(updatedUser);
    }
}

