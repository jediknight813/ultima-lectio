import express from "express";

import {createNotification, read_notification, update_notification, remove_friend, add_friend } from "../controllers/notifications.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/', auth, createNotification);

router.post('/add_friend', auth, add_friend);

router.post('/remove_friend', auth, remove_friend);

router.post('/read_notification/', auth, read_notification)

router.patch('/update_notification/', auth, update_notification)

export default router;