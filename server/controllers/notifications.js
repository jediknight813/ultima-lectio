import express from 'express';
import mongoose from 'mongoose';

import Post from '../models/Post.js';
import User from '../models/User.js';


export const createNotification = async (req, res) => {
    const notification = req.body;
    //console.log(notification)
    var notification_in_array = false

    const user = await User.findById(notification.sent_to);
    //console.log(user.notifications.includes(notification))
    //console.log(notification)
    //console.log(user.notifications)

    user.notifications.forEach(e => {
        if (JSON.stringify(e) === JSON.stringify(notification)) {
            notification_in_array = true
        }
    })

    try { 
        if (notification_in_array === false) {
            //console.log("added notification")
            const result = await User.findByIdAndUpdate(notification.sent_to,  { $addToSet: { notifications: notification } }, { new: true });
            res.status(200).json("notification sent")
        }
        else {
            //console.log("removed notification")
            const result = await User.findByIdAndUpdate(notification.sent_to,  { $pull: { notifications: notification } }, { new: true });
            res.status(200).json("notification sent")
        }
  
    } catch (error) {
        res.status(500).json({message: " something went wrong "})
    }
}