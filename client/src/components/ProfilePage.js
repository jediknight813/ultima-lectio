import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from 'react-router-dom'
import * as api from '../api/index.js'
import '../styles/ProfilePageStyles.css'
import moment from 'moment';
import CreateOrEditPost from "./CreateOrEditPost";
import Post from "./Post";
import decode from 'jwt-decode'
import {useNavigate, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FriendListItem from "./Friend_List_Item";


const ProfilePage = () => {
    // post editing
    const [posts, setPosts] = useState(undefined)
    const [updating_post, set_update_post] = useState(false)
    const [post_to_edit, set_post_to_edit] = useState(null)
    const [create_edit_post_menu, set_create_edit_post_menu_status] = useState(false)
    var update_post = {type: "update", post: post_to_edit}
    const [bookmarked_posts, set_bookmarked_posts] = useState(undefined)


    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams()
    const [profile_data, set_profile_data] = useState(undefined)
    const [current_user_data, set_current_user_data] = useState(undefined)
    const [user_id, setUser_id] = useState(JSON.parse(localStorage.getItem('profile')))
    const [button_pressed, press_button] = useState(0)
    const [follow_state, set_follow_state] = useState(undefined)
    const [notification_id, set_notification_id] = useState(undefined)
    const [view_posts_state, set_view_posts_state] = useState(false)
    const [view_friends_state, set_view_friends_state] = useState(false)
    const [view_saved_posts_state, set_view_saved_posts_state] = useState(false)
    const [view_profile_state, set_view_profile_state] = useState(true)
    const [posts_button_class, set_post_button_class] = useState("profile_button_not_selected")
    const [profile_button_class, set_profile_button_class] = useState("profile_button_selected")
    const [friends_button_class, set_friends_button_class] = useState("profile_button_not_selected")
    const [saved_posts_button_class, set_saved_posts_button_class] = useState("profile_button_not_selected")
    const [profile_about_me, set_profile_about_me] = useState(undefined)

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
            set_view_profile_state(true)
            set_profile_button_class("profile_button_selected")
        }

        if (button_type === "posts") {
            set_view_posts_state(true)
            set_post_button_class("profile_button_selected")
        }

        if (button_type === "friends") {
            set_view_friends_state(true)
            set_friends_button_class("profile_button_selected")
        }

        if (button_type === "saved_posts") {
            set_view_saved_posts_state(true)
            set_saved_posts_button_class("profile_button_selected")
        }
    }


    function manage_friend_button_submit(type) {
        let random_string = Math.random().toString(30).substring(3,29)

        if (type === "Add Friend") {
            api.createNotifcation({"type": "friend_request", "sent_from": current_user_data?.data?._id, "sent_to": profile_data?._id, "status": "unread", createdAt: new Date(), request_status: "undecided", notification_id: random_string })
        }

        if (type === "Accept") {
            api.update_friend_request_notification( {"id": notification_id, "request_status": "accepted", "remove": "false", "sent_to": profile_data?._id, "sent_from": current_user_data?.data?._id} )
            api.add_friend({sent_to: profile_data?._id, sent_from: current_user_data?.data?._id})
            api.createNotifcation({"type": "friend_request_accepted", "sent_from": current_user_data?.data?._id, "sent_to": profile_data?._id, "status": "unread", createdAt: new Date()})    
        }

        if (type === "Decline") {
            api.update_friend_request_notification( {"id": notification_id, "request_status": "declined", "remove": "false", "sent_to": profile_data?._id, "sent_from": current_user_data?.data?._id} )
            api.createNotifcation({"type": "friend_request_declined", "sent_from": current_user_data?.data?._id, "sent_to": profile_data?._id, "status": "unread", createdAt: new Date()})    
        }

        if (type === "Cancel Friend Request") {
            api.update_friend_request_notification( {"id": notification_id, "request_status": "declined", "remove": "true", "sent_to": profile_data?._id, "sent_from": current_user_data?.data?._id} )
            press_button(button_pressed+1)
        }

        if (type === "Remove Friend") {
            api.remove_friend({sent_to: profile_data?._id, sent_from: current_user_data?.data?._id})
            api.createNotifcation({"type": "unfriended", "sent_from": current_user_data?.data?._id, "sent_to": profile_data?._id, "status": "unread", createdAt: new Date()})    
        }

        setTimeout(() => { press_button(button_pressed+1); }, 400)
    }
    

    function check_friend_status(current_user, profile_user) {
        //console.log(current_user?.data, profile_user)

        let current_user_has_sent_friend_request = false
        profile_user.notifications.forEach(c => {
            if (c.sent_from === current_user.data._id && c.type === "friend_request") {
                if (!current_user.data.friends.includes(profile_user._id)) {
                    current_user_has_sent_friend_request = true
                    set_follow_state("Cancel Friend Request")
                }
            }
        })

        let profile_user_has_sent_friend_request = false
        current_user.data.notifications.forEach(c => {
            if (c.sent_from === profile_user._id && c.type === "friend_request") {
                if (!current_user.data.friends.includes(profile_user._id)) {
                    profile_user_has_sent_friend_request = true
                    set_follow_state("Accept")
                }
            }
        })


        if (!profile_user.friends.includes(current_user._id) && current_user_has_sent_friend_request === false && profile_user_has_sent_friend_request === false) {
            set_follow_state("Add Friend")
        }


        if (current_user.data.friends.includes(profile_user._id)) {
            set_follow_state("Remove Friend")
        }

    }


    // post functions
    const passedFunction = (data) => {
        set_post_to_edit(data)
        set_update_post(true)
    };

    const close_create_and_edit_post_menu = () => {
        setTimeout(() => { set_update_post(false); }, "500")
        set_create_edit_post_menu_status(false)
    };  

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        setUser(null)
        localStorage.clear();
        sessionStorage.clear()
        navigate('/')
    }

    function update_profile_about_me(e) {
        //console.log(e)
        set_profile_about_me(e)
        api.updateUserAboutMe({id: profile_data?._id, message: e})
    }



    useEffect(() => {  
        const fetchData = async () => {
            const { data } = await api.fetchUser(id)
            if (data !== undefined) {
                document.title = data?.username+" Profile"
                set_profile_data(data)
                set_profile_about_me(data.about_me)
                //setPosts(data.posts)
            }
            const api_posts = await api.fetchUserPosts(data._id)
            if (api_posts !== undefined) {
                setPosts(api_posts)
                //console.log(api_posts.data)
            }

            const api_bookmarks = await api.fetchUserBookMarkedPosts(data.bookmarked_posts)
            if (api_bookmarks !== undefined) {
                set_bookmarked_posts(api_bookmarks)
                //if (api_bookmarks.data.length === 0) {
                //    set_bookmarked_posts([])
                //}
                //console.log(api_bookmarks.data)
            }

            const current_user = await api.fetchUser(user_id?.result?._id)
            if (current_user !== undefined) {
                set_current_user_data(current_user)
            }
            check_friend_status(current_user, data)

            const token = user?.token;
            if (user === null) {
                navigate('/')
            }
            if (token) {
                const decodedToken = decode(token)

                if(decodedToken.exp * 1000 < new Date().getTime()) logout();
            }
        }
        fetchData()
            .catch(console.error);;
    }, [id, user_id?.result?._id, button_pressed] )
    


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
                                <button style={{ "backgroundColor": "rgb(232, 69, 69)"}} onClick={() => manage_friend_button_submit("Decline")}> Decline </button>
                            )}
                        </div>
                    )}

                    {(profile_data?.createdAt !== undefined) && (
                        <h2>joined {moment(profile_data?.createdAt).fromNow()}</h2>
                    )}
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

            <div className="profile_bottom_container">
                {(view_profile_state === true) && (
                        <div className="profile_about_me_and_friends_container">

                            <div className="about_me_parent_container">
                                <div className="view_friends_header">
                                    <h1>About Me</h1>
                                </div> 
                                {(profile_data?._id === current_user_data?.data?._id) && (
                                    <textarea value={profile_about_me} placeholder="write something about yourself" onChange={(e) => update_profile_about_me(e.target.value)} />
                                )}

                                {(profile_data?._id !== current_user_data?.data?._id) && (
                                    <h2> {profile_data.about_me} </h2>
                                )}

                            </div>  


                            <div style={{"width": "100%", "height": "auto"}}>
                            {(profile_data !== undefined) && (
                                <div style={{"height": "150px", overflowY: "hidden"}} className="view_friends_parent_container">
                                    <div className="view_friends_header">
                                        <h1>Friends</h1>
                                        {(profile_data.friends.length > 4) && ( 
                                            <div onClick={() => profile_button_state_update("friends")} style={{"marginLeft": "auto", color: "rgb(70, 140, 238)", marginRight: "10px", marginTop: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "12px"}}>
                                                See All Friends
                                            </div>
                                        )}
                                    </div> 
                                    {[...profile_data.friends].reverse().map((id) => (
                                        <FriendListItem friend_id={id} />
                                    ))}

                                </div>
                            )}
                        </div>  
                          
                    </div>    
                )}

                {(view_profile_state === true) && (
                    <div className="profile_side_posts_container">
                        {(updating_post === true) && (
                            <div className="create_post_menu_parent">
                                {(updating_post === true) && (
                                    <div onClick={() => {set_update_post(false)}} className="check_for_click"></div>    
                                )}
                                <CreateOrEditPost CreateOrEditPostData={update_post} close_create_and_edit_post_menu={close_create_and_edit_post_menu} />
                            </div>
                        )}

                        {(posts?.data !== undefined) && (
                            <div style={{"display": "flex", "flexDirection": "column", "gap": "25px"}}>
                                {[...posts.data].reverse().map((post) => (
                                    <Post post={post} func={passedFunction} />
                                ))}
                            </div>
                        )}
                        {(posts === undefined) && (
                            <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                <h1>Loading..</h1>
                            </div>
                        )}

                        {(posts?.length === 0) && (
                            <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                                <h3>{profile_data?.username} hasn't posted anything yet </h3>
                            </div>
                        )}
                    </div>    
                )}


                {(view_posts_state === true) && (
                    <div className="profile_view_posts_parent_container">
                        {(updating_post === true) && (
                            <div className="create_post_menu_parent">
                                {(updating_post === true) && (
                                    <div onClick={() => {set_update_post(false)}} className="check_for_click"></div>    
                                )}
                                <CreateOrEditPost CreateOrEditPostData={update_post} close_create_and_edit_post_menu={close_create_and_edit_post_menu} />
                            </div>
                        )}

                        {(posts?.data !== undefined) && (
                            <div style={{"display": "flex", "flexDirection": "column", "gap": "25px"}}>
                                {[...posts.data].reverse().map((post) => (
                                    <Post post={post} func={passedFunction} />
                                ))}
                            </div>
                        )}
                        {(posts === undefined) && (
                            <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                <h1>Loading..</h1>
                            </div>
                        )}

                        {(posts?.length === 0) && (
                            <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                                <h3>{profile_data?.username} hasn't posted anything yet </h3>
                            </div>
                        )}
                    </div>    
                )}


                {(view_friends_state === true) && (
                    <div style={{"width": "100%", "height": "auto"}}>
                        {(profile_data !== undefined) && (
                            <div style={{"height": "auto"}} className="view_friends_parent_container">
                                <div className="view_friends_header">
                                    <h1>Friends</h1>
                                </div> 
                                {[...profile_data.friends].reverse().map((id) => (
                                    <FriendListItem friend_id={id} />
                                ))}
                            </div>
                        )}
                    </div>    
                )}

                {(view_saved_posts_state === true) && (
                    <div className="profile_view_posts_parent_container">
                    {(updating_post === true) && (
                        <div className="create_post_menu_parent">
                            {(updating_post === true) && (
                                <div onClick={() => {set_update_post(false)}} className="check_for_click"></div>    
                            )}
                            <CreateOrEditPost CreateOrEditPostData={update_post} close_create_and_edit_post_menu={close_create_and_edit_post_menu} />
                        </div>
                    )}

                    {(bookmarked_posts?.data !== undefined) && (
                        <div style={{"display": "flex", "flexDirection": "column", "gap": "25px"}}>
                            {[...bookmarked_posts.data].reverse().map((post) => (
                                <Post post={post} func={passedFunction} />
                            ))}
                        </div>
                    )}
                    {(bookmarked_posts === undefined) && (
                        <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                            <h1>Loading..</h1>
                        </div>
                    )}

                    {(bookmarked_posts?.length === 0) && (
                        <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                            <h3>{profile_data?.username} hasn't posted anything yet </h3>
                        </div>
                    )}
                </div>     
                )}
                
            </div>

        </div>
    )
}


export default ProfilePage

