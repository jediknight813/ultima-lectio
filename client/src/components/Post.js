import React, {useState, useEffect} from "react";
import '../styles/PostStyles.css'
import CreateOrEditPost from './CreateOrEditPost'
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from "../actions/auth";
import { comment_on_post, getPosts, likePost, BookMarkPost, getPostsWithTag } from "../actions/posts";
import * as api from '../api/index.js';
import moment from 'moment';
import Comment from "./Comment";
import {useNavigate, useLocation} from 'react-router-dom';


const Post = ( post ) => {
    const [updatedPost, setUpdatedPost] = useState(undefined)
    const [post_user, set_post_user] = useState(null)
    const [current_user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [UserComment, SetUserComment] = useState({createdAt: "", comment: "", user_id: ""})
    const [ShowMoreComments, setShowMoreCommentsState] = useState(false)
    const [comment_container_parent_class, set_comment_container_parent_class] = useState("comment_container_parent")
    const [bookmarked_posts, set_bookmarked_posts] = useState({bookmarked_posts: []})
    const [render, rerender] = useState(1);

    function show_or_close_comments_menu() {
        if (ShowMoreComments === false) {
            set_comment_container_parent_class("comment_container_parent_show_all_comments")
            setShowMoreCommentsState(true)
        }
        else {
            set_comment_container_parent_class("comment_container_parent")
            setShowMoreCommentsState(false)
        }
    }


    useEffect(() => {   
    const fetchData = async () => {
        const { data } = await api.fetchUser(post?.post?.creator)
        const newdata = await api.fetchUser(current_user?.result?._id) 
        const postData = await api.fetchPostWithId(post?.post?._id) 
        if (postData !== undefined) {
            setUpdatedPost(postData.data)
        }
        if (newdata !== undefined) {
            set_bookmarked_posts(newdata.data)
        }
        set_post_user(data);
    }
    fetchData()
        .catch(console.error);;
    }, [post?.post?.creator])


    function like_or_unlike_post() {
        if (post.post.likes.includes(post_user._id) === true) {
            dispatch(likePost(post.post._id))
            send_like_notification()
        }
        else {
            dispatch(likePost(post.post._id))
            send_like_notification()
        }
        setTimeout(() => { update_current_post(); }, 1000)
    }

    const update_current_user = async () => {
        const newdata = await api.fetchUser(current_user?.result?._id)
        if (newdata.data !== undefined) {
            set_bookmarked_posts(newdata.data)
        }
    }
    const update_current_post = async () => {
        const postData = await api.fetchPostWithId(post?.post?._id) 
        if (postData !== undefined) {
            setUpdatedPost(postData.data)
        }
    }

    const send_bookmark_notification = async () => {
        if (is_current_user_post === false) {
            api.createNotifcation({"type": "bookmark", "sent_from": current_user?.result?._id, "sent_to": post.post?.creator, "post_id": post.post?._id, "status": "unread", createdAt: new Date() })
        }
       
    }

    const send_like_notification = async () => {
        if (is_current_user_post === false) {
            api.createNotifcation({"type": "like", "sent_from": current_user?.result?._id, "sent_to": post.post?.creator, "post_id": post.post?._id, "status": "unread", createdAt: new Date() })
        }
    }


    function bookmark_or_unbookmark_post() {
        dispatch(BookMarkPost(post.post._id))
        send_bookmark_notification()
        setTimeout(() => { update_current_user(); }, 1000)
    }


    const send_comment = async (e) => {
        e.preventDefault();
        dispatch(comment_on_post(post.post._id, UserComment))
        send_comment_notification()
        SetUserComment({createdAt: "", comment: "", user_id: ""})
        setTimeout(() => { update_current_post(); }, 1000)
    };


    const send_comment_notification = async () => {
        if (is_current_user_post === false) {
            api.createNotifcation({"type": "comment", "sent_from": current_user?.result?._id, "sent_to": post.post?.creator, "post_id": post.post?._id, "status": "unread", comment: UserComment, createdAt: new Date() })
        }
    }


    var is_current_user_post = false
   if (current_user?.result?._id === post_user?._id) {
        is_current_user_post = true
   }


    return (
        <div className="post_parent_container">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className="post_username_image_date_and_edit_containter">
                {post_user?.profile_image === undefined ? (
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                ):(
                    <img style={{"cursor": "pointer"}} onClick={() => navigate(`/profile/${post?.post?.creator}`)} referrerpolicy="no-referrer" alt="profile_img" src={post_user?.profile_image}/>
                )}

                <div>
                    <h1 style={{"cursor": "pointer", width: "19ch", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}} onClick={() => navigate(`/profile/${post?.post?.creator}`)}>{post_user?.username}</h1>
                    <h2>{moment(updatedPost?.createdAt).fromNow()}</h2>
                </div>
                
                {(is_current_user_post === true) && (
                    <button style={{"marginLeft": "auto", color: "white", backgroundColor: "transparent", border:"none", fontSize: "46px", cursor: "pointer"}} onClick={() => post.func(post?.post)}> <i class="material-icons">more_horiz</i> </button>
                )}
            </div>
                {(updatedPost?.tags?.length >= 1 && updatedPost?.tags[0].split("").length > 1) && (
                    <div style={{"display": "flex", width: "90%", gap: "10px", fontWeight: "bold", fontSize:" 15px", overflow: "hidden"}}>
                        {updatedPost?.tags.map((post) => (
                        <div key={post} style={{"cursor": "pointer"}} onClick={() => navigate(`/tags/${post.trim()}`)}>{"#"+post.trim()} </div>
                        ))}
                    </div>  
                )}

            <div>

            </div>
                {post.post.message.split("")?.length >= 1 ? (
                    <div className="post_message_container">
                        {post.post?.message}
                    </div>
                ):(
                    <div>
                    </div>
                )}
            <div>


            </div>
                {post.post.selectedFile !== "" ? (
                    <div className="post_image_container">
                        <img alt="post_image" src={post?.post?.selectedFile}/>
                    </div>
                ):(
                    <div>
                    </div>
                )}
            <div>

            </div>
            
            <div style={{width: "90%", "height": "1px", backgroundColor: "white", marginBottom: "-8px"}}> </div>
            
            <div style={{"width": "90%", "display": "flex"}}>
                {updatedPost?.likes?.includes(current_user?.result?._id) === false ? (
                    <div className="like_post_container">
                        <i onClick={() => like_or_unlike_post()} class="fa fa-heart-o" style={{"fontSize": "30px", cursor: "pointer"}}></i>
                        <h1 style={{fontSize: "20px", marginTop: "10px", "marginLeft": "10px"}}>{updatedPost?.likes?.length}</h1>
                    </div>
                ):(
                    <div className="like_post_container">
                        <i onClick={() => like_or_unlike_post()} class="fa fa-heart" style={{"fontSize": "30px", color: "rgb(232, 69, 69)", "cursor": "pointer"}}></i>
                        <h1 style={{fontSize: "20px", marginTop: "10px", "marginLeft": "10px"}}>{updatedPost?.likes?.length}</h1>
                    </div>
                )}

                {bookmarked_posts?.bookmarked_posts?.includes(post.post._id) ? (
                    <div className="bookmark_post_container">
                        <button style={{color: "white", backgroundColor: "transparent", border:"none", fontSize: "28px", cursor: "pointer", marginRight: "8px"}} onClick={() => navigate(`/post/${post?.post?._id}`)}> <i class="fa fa-share"></i></button>
                        <i onClick={() => bookmark_or_unbookmark_post()} class="fa fa-bookmark"></i>
                    </div>
                ):(
                    <div className="bookmark_post_container">
                        <button style={{color: "white", backgroundColor: "transparent", border:"none", fontSize: "28px", cursor: "pointer", marginRight: "8px"}} onClick={() => navigate(`/post/${post?.post?._id}`)}> <i class="fa fa-share"></i></button>
                        <i onClick={() => bookmark_or_unbookmark_post()} class="fa fa-bookmark-o"></i>
                    </div>
                )}
            </div>


            <div style={{width: "90%", "height": "1px", backgroundColor: "white", marginTop:"-10px"}}> </div>


            {updatedPost?.comments?.length >= 1 ? (
                <div className={comment_container_parent_class}>
                    {[...updatedPost?.comments].reverse().map((comment) => (
                        <Comment key={comment?.createdAt} comment={comment}/>
                    ))}
                </div>
            ):(
                <div>

                </div>   
            )}


            {updatedPost?.comments?.length >= 2 ? (
                <div style={{"width": "90%"}}>

                    {ShowMoreComments === false ? (
                    <div className="show_comments_button_parent_container">
                        <button onClick={() => show_or_close_comments_menu()} >Show More</button>
                    </div>
                    ):(
                    <div className="show_comments_button_parent_container">
                        <button onClick={() => show_or_close_comments_menu()} >Show Less</button>
                    </div>   
                    )}

                </div>
            ):(
                <div>
                </div>   
            )}


            <form onSubmit={send_comment} className="make_a_comment_container">
                {bookmarked_posts?.profile_image === undefined ? (
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                ):(
                    <img alt="profile_img" src={bookmarked_posts?.profile_image}/>
                )}
                <input required minLength={3} type="text" placeholder={"Say something.."} value={UserComment.comment} onChange={(e) => SetUserComment({ ...UserComment, comment: e.target.value, createdAt: new Date(), user_id: current_user.result._id  })} />
                <button><i class="fa fa-send"></i></button>
            </form>
        </div>
    )
}


export default Post