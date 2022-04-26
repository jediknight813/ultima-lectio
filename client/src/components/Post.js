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
    const [post_user, set_post_user] = useState(null)
    const [current_user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [UserComment, SetUserComment] = useState({createdAt: "", comment: "", user_id: ""})
    const [ShowMoreComments, setShowMoreCommentsState] = useState(false)
    const [comment_container_parent_class, set_comment_container_parent_class] = useState("comment_container_parent")
    const [bookmarked_posts, set_bookmarked_posts] = useState({bookmarked_posts: []})
    const [render, rerender] = useState(false);

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
        }
        else {
            dispatch(likePost(post.post._id))
        }
        
    }

    const update_current_user = async () => {
        const newdata = await api.fetchUser(current_user?.result?._id)
        if (newdata.data !== undefined) {
            set_bookmarked_posts(newdata.data)
            //console.log(bookmarked_posts)
        }
    }

    //console.log("here")
    //console.log(bookmarked_posts)

    function bookmark_or_unbookmark_post() {
        //console.log(bookmarked_posts)
        dispatch(BookMarkPost(post.post._id))
        setTimeout(() => {
            update_current_user();
          }, 1000)
    }

    const send_comment = async (e) => {
        e.preventDefault();
        //console.log(UserComment)
        dispatch(comment_on_post(post.post._id, UserComment))
        SetUserComment({createdAt: "", comment: "", user_id: ""})
    };

    var is_current_user_post = false
    //var editing_post = true

   if (current_user?.result?._id === post_user?._id) {
        is_current_user_post = true
   }

    //console.log(bookmarked_posts)
    //console.log(bookmarked_posts.bookmarked_posts.includes(post.post._id), post.post._id, bookmarked_posts.bookmarked_posts)
    
    return (
        <div className="post_parent_container">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className="post_username_image_date_and_edit_containter">
                {post_user?.profile_image === undefined ? (
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                ):(
                    <img alt="profile_img" src={post_user?.profile_image}/>
                )}

                <div>
                    <h1>{post_user?.username}</h1>
                    <h2>{moment(post.post.createdAt).fromNow()}</h2>
                </div>

                {(is_current_user_post === true) && (
                    <button style={{"marginLeft": "auto", color: "white", backgroundColor: "transparent", border:"none", fontSize: "46px", cursor: "pointer"}} onClick={() => post.func(post?.post)}> <i class="material-icons">more_horiz</i> </button>
                )}


            </div>
                {(post.post.tags?.length >= 1 && post.post?.tags[0].split("").length > 1) && (
                    <div style={{"display": "flex", width: "90%", gap: "10px", fontWeight: "bold", fontSize:" 15px"}}>
                        {post?.post?.tags.map((post) => (
                        <div style={{"cursor": "pointer"}} onClick={() => navigate(`/tags/${post.trim()}`)}>{"#"+post.trim()} </div>
                        ))}
                    </div>  
                )}

            <div>

            </div>
                {post.post.message.split("")?.length >= 1 ? (
                    <div className="post_message_container">
                        {post?.post?.message}
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
                {post?.post?.likes?.includes(current_user?.result?._id) === false ? (
                    <div className="like_post_container">
                        <i onClick={() => like_or_unlike_post()} class="fa fa-heart-o" style={{"fontSize": "30px", cursor: "pointer"}}></i>
                        <h1 style={{fontSize: "20px", marginTop: "10px", "marginLeft": "10px"}}>{post?.post?.likes?.length}</h1>
                    </div>
                ):(
                    <div className="like_post_container">
                        <i onClick={() => like_or_unlike_post()} class="fa fa-heart" style={{"fontSize": "30px", color: "rgb(232, 69, 69)", "cursor": "pointer"}}></i>
                        <h1 style={{fontSize: "20px", marginTop: "10px", "marginLeft": "10px"}}>{post?.post?.likes?.length}</h1>
                    </div>
                )}

                {bookmarked_posts?.bookmarked_posts?.includes(post.post._id) ? (
                    <div className="bookmark_post_container">
                        <i onClick={() => bookmark_or_unbookmark_post()} class="fa fa-bookmark"></i>
                    </div>
                ):(
                    <div className="bookmark_post_container">
                        <i onClick={() => bookmark_or_unbookmark_post()} class="fa fa-bookmark-o"></i>
                    </div>
                )}
            </div>


            <div style={{width: "90%", "height": "1px", backgroundColor: "white", marginTop:"-10px"}}> </div>


            {post?.post?.comments?.length >= 1 ? (
                <div className={comment_container_parent_class}>
                    {[...post.post.comments].reverse().map((comment) => (
                        <Comment comment={comment}/>
                    ))}
                </div>
            ):(
                <div>

                </div>   
            )}


            {post?.post?.comments?.length >= 2 ? (
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
                {post_user?.profile_image === undefined ? (
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                ):(
                    <img alt="profile_img" src={current_user?.result?.profile_image}/>
                )}
                <input required minLength={3} type="text" placeholder={"Say something.."} value={UserComment.comment} onChange={(e) => SetUserComment({ ...UserComment, comment: e.target.value, createdAt: new Date(), user_id: current_user.result._id  })} />
                <button><i class="fa fa-send"></i></button>
            </form>




        </div>
    )
}


export default Post