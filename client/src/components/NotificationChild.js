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
    const [requestStatus, setRequestStatus] = useState(undefined)


    useEffect(() => {   

        if (notification?.request_status !== undefined) {
            setRequestStatus(notification.request_status)
        }

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


    const accept_friend_request = async () => {
        setRequestStatus("accepted")
        api.update_friend_request_notification( {"id": notification.notification_id, "request_status": "declined", "remove": "false", "sent_to": notification.sent_to, "sent_from": notification.sent_from} )
        api.add_friend({sent_to: notification.sent_to, sent_from: notification.sent_from})
        api.createNotifcation({"type": "friend_request_accepted", "sent_from": notification.sent_to, "sent_to": notification.sent_from, "status": "unread", createdAt: new Date()}) 
    }

    const decline_friend_request = async () => {
        setRequestStatus("declined")
        api.update_friend_request_notification( {"id": notification.notification_id, "request_status": "declined", "remove": "false", "sent_to": notification.sent_to, "sent_from": notification.sent_from} )
        api.createNotifcation({"type": "friend_request_declined", "sent_from": notification.sent_to, "sent_to": notification.sent_from, "status": "unread", createdAt: new Date()})    
    }


    if (notification.type === "like") {
        return( 
            <div className={notification_parent_background}>
                <i style={{"color": "rgb(234, 74, 74)"}} class="fa fa-heart"></i>
                <div onClick={() => navigate(`/profile/${notification_from._id}`)} className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
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
            <div  onClick={() => navigate(`/profile/${notification_from._id}`)} className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
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
                <div  onClick={() => navigate(`/profile/${notification_from._id}`)} className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
                <h1 className="notification_child_text" > has saved your</h1>
                <h1 className="notification_child_text" style={{"cursor": "pointer", fontWeight: "bold"}} onClick={() => navigate(`/post/${notification.post_id}`)}>post</h1>
                <h1 className="notification_time" style={{"marginLeft": "auto", marginRight: "10px", fontWeight: "bold"}}>{moment(notification.createdAt).fromNow()}</h1>
            </div>
        )
    }

    if (notification.type === "friend_request") {
        return(  
            <div className={notification_parent_background}>
                <i class="fa fa-group"></i>
                <div onClick={() => navigate(`/profile/${notification_from._id}`)} className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
                <h1 className="notification_child_text" > has sent you a friend request</h1>
                {(requestStatus === "undecided") && (
                    <div className="accept_decline_button_container">
                        <button onClick={() => accept_friend_request()} style={{"backgroundColor": "rgb(70, 140, 238)"}}> accept </button>
                        <button onClick={() => decline_friend_request()} style={{ "backgroundColor": "rgb(232, 69, 69)"}}> decline </button>  
                    </div>  
                )}
                 {(requestStatus === "accepted") && (
                    <div style={{"color": "rgb(70, 140, 238)", "marginRight": "10px",  "marginLeft": "auto", fontWeight: "bold"}}>
                        Accepted
                    </div>  
                )}
                 {(requestStatus === "declined") && (
                    <div style={{ "color": "rgb(232, 69, 69)", "marginRight": "10px",  "marginLeft": "auto", fontWeight: "bold"}}>
                        Declined
                    </div>  
                )}
            </div>
        )
    }

    if (notification.type === "friend_request_accepted") {
        return( 
            <div className={notification_parent_background}>
                <i style={{"color": "rgb(70, 140, 238)"}} class="fa fa-exclamation"></i>
                <div  onClick={() => navigate(`/profile/${notification_from._id}`)} className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
                <h1 className="notification_child_text" > has accepted your friend request</h1>
                <h1 className="notification_time" style={{"marginLeft": "auto", marginRight: "10px", fontWeight: "bold"}}>{moment(notification.createdAt).fromNow()}</h1>
            </div>
        )
    }

    if (notification.type === "friend_request_declined") {
        return( 
            <div className={notification_parent_background}>
                <i style={{"color": "rgb(232, 69, 69)"}} class="fa fa-meh-o"></i>
                <div  onClick={() => navigate(`/profile/${notification_from._id}`)} className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
                <h1 className="notification_child_text" > has declined your friend request</h1>
                <h1 className="notification_time" style={{"marginLeft": "auto", marginRight: "10px", fontWeight: "bold"}}>{moment(notification.createdAt).fromNow()}</h1>
            </div>
        )
    }

    if (notification.type === "unfriended") {
        return( 
            <div className={notification_parent_background}>
                <i style={{"color": "rgb(232, 69, 69)"}} class="fa fa-minus"></i>
                <div  onClick={() => navigate(`/profile/${notification_from._id}`)} className="notification_username" style={{"cursor": "pointer", fontWeight: "bold"}}>{notification_from?.username}</div>
                <h1 className="notification_child_text" > has unfriended you </h1>
                <h1 className="notification_time" style={{"marginLeft": "auto", marginRight: "10px", fontWeight: "bold"}}>{moment(notification.createdAt).fromNow()}</h1>
            </div>
        )
    }

    if (notification.type === undefined) {
        return (
            <div>

            </div>
        )
    }


}

export default NotificationsChild
