import express from 'express';
import mongoose from 'mongoose';

import Post from '../models/Post.js';
import User from '../models/User.js';


export const createNotification = async (req, res) => {
    const notification = req.body;
    var notification_in_array = false

    const user = await User.findById(notification.sent_to);
    user.notifications.forEach(e => {
        let test = JSON.parse(JSON.stringify(notification))
        test["createdAt"] = ""
        e["createdAt"] = ""
        if (JSON.stringify(e) === JSON.stringify(test)) {
            notification_in_array = true
        }
    })

    try { 
        if (notification_in_array === false) {
            const result = await User.findByIdAndUpdate(notification.sent_to,  { $addToSet: { notifications: notification } }, { new: true });
            res.status(200).json("notification sent")
        }
        else {
            const result = await User.findByIdAndUpdate(notification.sent_to,  { $pull: { notifications: notification } }, { new: true });
            res.status(200).json("notification sent")
        }
  
    } catch (error) {
        res.status(500).json({message: " something went wrong "})
    }
}



export const read_notification = async (req, res) => {
    const notification = req.body;
    var notification_in_array = false

    if (!req.userId) return res.json({message: 'Unauthenticated'})
    if (!await User.findById(notification.sent_to));
    const user = await User.findById(notification.sent_to);

    user.notifications.forEach(e => {
        if (JSON.stringify(e) === JSON.stringify(notification)) {
            notification_in_array = true
        }
    })

    if (notification_in_array === true) {
        const pull = await User.findByIdAndUpdate(notification.sent_to,  { $pull: { notifications: notification } }, { new: true });
        notification["status"] = "read"
        const push = await User.findByIdAndUpdate(notification.sent_to,  { $addToSet: { notifications: notification } }, { new: true });
        res.status(200).json("notification sent")
        
    }
    else {
        res.status(500).json({message: " something went wrong "})
    }
}


export const update_notification = async (req, res) => {
    const { id, request_status, sent_to, sent_from, remove } = req.body
    const user_one = await User.findByIdAndUpdate(sent_from,  { $pull: { notifications: {notification_id: id} } }, { new: true })
    const user_two = await User.findByIdAndUpdate(sent_to,  { $pull: { notifications: {notification_id: id} } }, { new: true })

    res.status(200).json("notification updated")
}


export const add_friend = async (req, res) => {
    const {sent_to, sent_from } = req.body
    const user_one = await User.findByIdAndUpdate(sent_to,  { $addToSet: { friends:  sent_from} }, { new: true });
    const user_two = await User.findByIdAndUpdate(sent_from,  { $addToSet: { friends:  sent_to } }, { new: true });
    res.status(200).json("friend added")
}


export const remove_friend = async (req, res) => {
    const {sent_to, sent_from } = req.body
    const user_one = await User.findByIdAndUpdate(sent_to,  { $pull: { friends:  sent_from} }, { new: true });
    const user_two = await User.findByIdAndUpdate(sent_from,  { $pull: { friends:  sent_to } }, { new: true });
    res.status(200).json("friend removed")
}