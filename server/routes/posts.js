import express from "express";

import {getTags, getUserBookMarkedPosts, getUserPosts, getPosts, createPost, updatePost, deletePost, likePost, add_comment_to_post, getPostsWithTag, getPostsWithSearch, getPostWithId } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getPosts);

router.get('/tags', getTags);

router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost)

router.delete('/:id', auth, deletePost)

router.patch('/:id/likePost', auth, likePost)

router.post('/tag/:id', auth, getPostsWithTag)

router.post('/search/:id', auth, getPostsWithSearch)

router.post('/getPost/:id', auth, getPostWithId)

router.post('/getUserPosts/:id', auth, getUserPosts) 

router.post('/getUserBookMarkedPosts/:id', auth, getUserBookMarkedPosts)

router.patch('/:id/add_comment_to_post', auth, add_comment_to_post)

export default router;