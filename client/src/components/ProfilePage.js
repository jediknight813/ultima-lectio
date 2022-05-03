import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from 'react-router-dom'
import * as api from '../api/index.js'
import '../styles/ProfilePageStyles.css'
import moment from 'moment';


const ProfilePage = () => {
    const { id } = useParams()
    const [profile_data, set_profile_data] = useState(undefined)
    const [current_user_data, set_current_user_data] = useState(undefined)
    const [user_id, setUser_id] = useState(JSON.parse(localStorage.getItem('profile')))
    
    const [follow_state, set_follow_state] = useState("Add Friend")

    const [notification_id, set_notification_id] = useState(undefined)
    const [view_posts_state, set_view_posts_state] = useState(false)
    const [view_friends_state, set_view_friends_state] = useState(false)
    const [view_saved_posts_state, set_view_saved_posts_state] = useState(false)
    const [view_profile_state, set_view_profile_state] = useState(true)
    const [posts_button_class, set_post_button_class] = useState("profile_button_not_selected")
    const [profile_button_class, set_profile_button_class] = useState("profile_button_selected")
    const [friends_button_class, set_friends_button_class] = useState("profile_button_not_selected")
    const [saved_posts_button_class, set_saved_posts_button_class] = useState("profile_button_not_selected")


    function profile_button_state_update( button_type ){ 
        set_view_posts_state(false)
        set_view_friends_state(false)
        set_view_saved_posts_state(false)
        set_view_profile_state(false)
        set_post_button_class("profile_button_not_selected")
        set_friends_button_class("profile_button_not_selected")
        set_saved_posts_button_class("profile_button_not_selected")
        set_profile_button_class("profile_button_not_selected")

        if (button_type === "profile") {
            set_view_profile_state(false)
            set_profile_button_class("profile_button_selected")
        }

        if (button_type === "posts") {
            set_view_posts_state(false)
            set_post_button_class("profile_button_selected")
        }

        if (button_type === "friends") {
            set_view_friends_state(false)
            set_friends_button_class("profile_button_selected")
        }

        if (button_type === "saved_posts") {
            set_view_saved_posts_state(false)
            set_saved_posts_button_class("profile_button_selected")
        }
    }


    function manage_friend_button_submit(type) {
        let random_string = Math.random().toString(30).substring(3,29)

        if (type === "Add Friend") {
            api.createNotifcation({"type": "friend_request", "sent_from": current_user_data?.data?._id, "sent_to": profile_data?._id, "status": "unread", createdAt: new Date(), request_status: "undecided", notification_id: random_string })
            check_friend_status()
        }

        if (type === "Accept") {
            api.update_friend_request_notification( {"id": notification_id, "request_status": "accepted"} )
            check_friend_status()
        }

        if (type === "Decline") {
            api.update_friend_request_notification( {"id": notification_id, "request_status": "declined"} )
            check_friend_status()
        }

    }
    
    function check_friend_status() {
        if (profile_data?.friends?.includes(current_user_data?.data?._id)) {
            set_follow_state("Remove Friend")
        }

        profile_data?.notifications?.forEach(e => {
            if(e?.sent_from === current_user_data?.data?._id && e?.type === "friend_request" && e?.request_status === "undecided") {
                set_follow_state("Cancel Friend Request")
            }
        }) 

        current_user_data?.data?.notifications?.forEach(e => {
            if (e.sent_from === profile_data?._id && e.type === "friend_request" && e?.request_status === "undecided") {
                console.log("here")
                set_follow_state("Accept")
                set_notification_id(e?.notification_id)
            }
        })
    }


    useEffect(() => {   
        const fetchData = async () => {
            const { data } = await api.fetchUser(id)
            if (data !== undefined) {
                document.title = data?.username+" Profile"
                set_profile_data(data)
            }
            const current_user = await api.fetchUser(user_id?.result?._id)
            if (current_user !== undefined) {
                set_current_user_data(current_user)
                check_friend_status()
            }
        }
        fetchData()
            .catch(console.error);;
    }, [id, user_id?.result?._id] )
    
    return (
        <div className="ProfilePageParentContainer">
            <Header />
            <div className="profile_top_container">
                <div className="profile_image_username_and_date_container">
                    {profile_data?.profile_image === undefined ? (
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    ):(
                        <img referrerpolicy="no-referrer" alt="profile_img" src={profile_data?.profile_image}/>
                    )}
                    <h1>{profile_data?.username}</h1>

                    {(current_user_data?.data?._id !== profile_data?._id && follow_state !== undefined) && (
                        <div className="friend_request_parent_container">
                            <button onClick={() => manage_friend_button_submit(follow_state)}> {follow_state} </button>
                            {(follow_state === "Accept") && (
                                <button onClick={() => manage_friend_button_submit("Decline")}> Decline </button>
                            )}
                        </div>
                    )}

                    <h2>joined {moment(profile_data?.createdAt).fromNow()}</h2>
                    <h2>{profile_data?.friends?.length} friends</h2>
                </div>
                
                <div className="profile_line"> </div>
                
                <div className="profile_top_button_container">
                    <button onClick={() => profile_button_state_update("profile")} className={profile_button_class} > Profile </button>
                    <button onClick={() => profile_button_state_update("posts")} className={posts_button_class} > Posts </button>
                    <button onClick={() => profile_button_state_update("friends")}  className={friends_button_class}> Friends </button>
                    <button onClick={() => profile_button_state_update("saved_posts")}  className={saved_posts_button_class}> Saved Posts </button>
                </div>

            </div>

        </div>
    )
}


export default ProfilePage

