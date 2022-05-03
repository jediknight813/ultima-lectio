import express from "express";

import {createNotification, read_notification, update_notification, remove_friend, add_friend } from "../controllers/notifications.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//router.get('/', getPosts);

//router.get('/tags', getTags);

router.post('/', auth, createNotification);

router.post('/add_friend', auth, add_friend);

router.post('/remove_friend', auth, remove_friend);

router.post('/read_notification/', auth, read_notification)

router.patch('/update_notification/', auth, update_notification)

//router.patch('/:id', auth, updatePost)

//router.delete('/:id', auth, deletePost)

//router.patch('/:id/likePost', auth, likePost)

//router.post('/tag/:id', auth, getPostsWithTag)

//router.post('/search/:id', auth, getPostsWithSearch)

//router.post('/getPost/:id', auth, getPostWithId)

//router.patch('/:id/add_comment_to_post', auth, add_comment_to_post)

export default router;