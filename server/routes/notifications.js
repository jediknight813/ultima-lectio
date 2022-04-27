import express from "express";

import {createNotification } from "../controllers/notifications.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//router.get('/', getPosts);

//router.get('/tags', getTags);

router.post('/', auth, createNotification);

//router.patch('/:id', auth, updatePost)

//router.delete('/:id', auth, deletePost)

//router.patch('/:id/likePost', auth, likePost)

//router.post('/tag/:id', auth, getPostsWithTag)

//router.post('/search/:id', auth, getPostsWithSearch)

//router.post('/getPost/:id', auth, getPostWithId)

//router.patch('/:id/add_comment_to_post', auth, add_comment_to_post)

export default router;