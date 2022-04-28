import express from "express";

import {getUsers, createUser, updateUser, LoginUser, SignInGoogleUser, getUser, bookmarkPost} from "../controllers/users.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.post('/Login', LoginUser);

router.patch('/:id', updateUser)

router.post('/google', SignInGoogleUser)

router.post('/getUser/:id', auth, getUser)

router.patch('/:id/bookmark', auth, bookmarkPost)

//router.delete('/:id', deletePost)

//router.patch('/:id/likePost', likePost)

export default router;
