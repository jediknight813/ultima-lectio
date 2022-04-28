import React, { useState, useEffect } from "react";
import '../styles/notificationStyles.css'
import * as api from '../api/index.js'
import {useNavigate, useLocation} from 'react-router-dom';
import moment from 'moment';


const NotificationsChild = ( {notification} ) => {
    //console.log(notification)
    const [notification_from, set_notification_from] = useState(undefined)
    const [notification_parent_background, set_notification_parent_background] = useState("notification_child_parent")
    const navigate = useNavigate()

    const [test, settest] = useState({"HELLO": "WORLD"})

    useEffect(() => {   
        if (notification.status === "unread") {
            api.read_notification(notification)
            set_notification_parent_background("notification_child_parent_unread")
        }    
        const fetchData = async () => {
            const { data } = await api.fetchUser(notification.sent_from)
            if (data !== undefined) {
                set_notification_from(data)
            }
        }
        fetchData()
            .catch(console.error);;
    }, [])


    if (notification.type === "like") {
        return( 
            <div className={notification_parent_background}>
                <i style={{"color": "rgb(234, 74, 74)"}} class="fa fa-heart"></i>
                <div className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
                <h1 className="notification_child_text" > has liked your</h1>
                <h1 className="notification_child_text" style={{"cursor": "pointer", fontWeight: "bold"}} onClick={() => navigate(`/post/${notification.post_id}`)}>post</h1>
                <h1 className="notification_time" style={{"marginLeft": "auto", marginRight: "10px", fontWeight: "bold"}}>{moment(notification.createdAt).fromNow()}</h1>
            </div>
        )
    }


    if (notification.type === "comment") {
        return( 
            <div className={notification_parent_background}>
            <i style={{"color": "white"}} class="fa fa-wechat"></i>
            <div className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
            <h1 className="notification_child_text" > has commented on your</h1>
            <h1 className="notification_child_text" style={{"cursor": "pointer", fontWeight: "bold"}} onClick={() => navigate(`/post/${notification.post_id}`)}>post</h1>
            <h1 className="notification_time" style={{"marginLeft": "auto", marginRight: "10px", fontWeight: "bold"}}>{moment(notification.createdAt).fromNow()}</h1>
        </div>
        )
    }


    if (notification.type === "bookmark") {
        return( 
            <div className={notification_parent_background}>
                <i style={{"color": "rgb(228, 193, 21)"}} class="fa fa-bookmark"></i>
                <div className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
                <h1 className="notification_child_text" > has saved your</h1>
                <h1 className="notification_child_text" style={{"cursor": "pointer", fontWeight: "bold"}} onClick={() => navigate(`/post/${notification.post_id}`)}>post</h1>
                <h1 className="notification_time" style={{"marginLeft": "auto", marginRight: "10px", fontWeight: "bold"}}>{moment(notification.createdAt).fromNow()}</h1>
            </div>
        )
    }


}

export default NotificationsChild
