import express from "express";

import { getPosts, createPost, updatePost, deletePost, likePost, add_comment_to_post } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getPosts);

router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost)

router.delete('/:id', auth, deletePost)

router.patch('/:id/likePost', auth, likePost)

router.patch('/:id/add_comment_to_post', auth, add_comment_to_post)

export default router;