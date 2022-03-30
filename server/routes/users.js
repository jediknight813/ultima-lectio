import express from "express";

import { getUsers, createUser, updateUser, LoginUser} from "../controllers/users.js";

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.post('/Login', LoginUser);

router.patch('/:id', updateUser)

//router.delete('/:id', deletePost)

//router.patch('/:id/likePost', likePost)

export default router;