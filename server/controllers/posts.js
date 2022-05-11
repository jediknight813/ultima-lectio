import express from 'express';
import mongoose from 'mongoose';

import Post from '../models/Post.js';


const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const Posts = await Post.find();
                
        res.status(200).json(Posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    try {
        const result = await Post.create({...post, createdAt: new Date().toISOString()})
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({message: " something went wrong "})
    }
}

export const updatePost = async (req, res) => {
    const { title, message, creator, selectedFile, tags, _id } = req.body;

    if (!await Post.findById(_id));

    const updatedPost = { creator, title, message, tags, selectedFile, _id: _id };

    await Post.findByIdAndUpdate(_id, updatedPost, { new: true });

    const updated = await Post.findById(_id)

    res.json(updated);

}

export const deletePost = async (req, res ) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "post deleted "})


}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) return res.json({message: 'Unauthenticated'})

    if (!await Post.findById(id));

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (post.likes.includes(req.userId) === true) {
        const updatedPost = await Post.findByIdAndUpdate(id,  { $pull: { likes: req.userId } }, { new: true });
        res.json(updatedPost);
    }
    else {
        const updatedPost = await Post.findByIdAndUpdate(id,  { $addToSet: { likes: req.userId } }, { new: true });
        res.json(updatedPost);
    }
    
}


export const add_comment_to_post  = async (req, res) => { 
    const { id } = req.params;
    const comment = req.body;

    if (!req.userId) return res.json({message: 'Unauthenticated'})

    if (!await Post.findById(id));

    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(id,  { $push: { comments: comment } }, { new: true });
    res.json(updatedPost);
}



export const getPostsWithTag = async (req, res) => { 
    var { id } = req.params
    id = id.trim()
    try {
        const posts = await Post.find( { tags: { $all: id } } )
        res.json(posts)
    } catch (error) {
        res.status(404).json({message: "no posts with matching tags found"})
    }
}


export const getTags = async (req, res) => { 
    try {

        const Tags = await Post.distinct( "tags" ) 
        res.status(200).json(Tags);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getPostsWithSearch = async (req, res) => { 
    var { id } = req.params
    const message = new RegExp(id, 'i')
    id = id.trim()

    try {        
        const posts = await Post.find( {message} )
        res.json(posts)

    } catch (error) {
        res.status(404).json({message: "no posts with matching tags found"})
    }
}


export const getPostWithId = async (req, res) => {
    const { id } = req.params
    if (!await Post.findById(id));
    const user = await Post.findById(id);
    res.json(user);
}

export const getUserPosts = async (req, res) => {
    const { id } = req.params
    if (!await Post.find( {creator: id} ));
    const posts = await Post.find( {creator: id} );
    res.json(posts);
}

export const getUserBookMarkedPosts = async (req, res) => {
    const { id } = req.params
    let bookmarked_posts = id.split(",")
    if (!await Post.find( { _id: bookmarked_posts } ));   
        const posts = await Post.find({ _id: bookmarked_posts })
        res.json(posts);
}