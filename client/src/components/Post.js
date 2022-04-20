import React, {useState, useEffect} from "react";
import '../styles/PostStyles.css'
import CreateOrEditPost from './CreateOrEditPost'
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from "../actions/auth";
import { getPosts, likePost } from "../actions/posts";
import * as api from '../api/index.js';
import moment from 'moment';


const Post = ( post ) => {
    const [post_user, set_post_user] = useState(null)
    const [current_user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    

    useEffect(() => {   
    const fetchData = async () => {
        const { data } = await api.fetchUser(post?.post?.creator)
        set_post_user(data);
    }
    fetchData()
        .catch(console.error);;
    }, [])

    function like_or_unlike_post() {
        if (post.post.likes.includes(post_user._id) === true) {
            //console.log("dislike post")
            dispatch(likePost(post.post._id))
        }
        else {
            //console.log("like post")
            dispatch(likePost(post.post._id))
        }
    }

    var is_current_user_post = false
    var editing_post = true

   if (current_user?.result?._id === post_user?._id) {
        is_current_user_post = true
   }

   //console.log(post.post, post_user)

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
                {post.post.tags[0].split(", ").length <= 1 ? (
                    <div>
                    </div>
                ):(
                    <div style={{"display": "flex", width: "90%", gap: "10px", fontWeight: "bold", fontSize:" 15px"}}>
                        {post?.post?.tags[0].split(", ").map((post) => (
                        <div>{"#"+post} </div>
                        ))}
                    </div>
                )}
            <div>

            </div>
                {post.post.message.split("").length >= 1 ? (
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
            
            <div style={{width: "90%", "height": "1px", backgroundColor: "white"}}> </div>

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

        </div>
    )
}


export default Post