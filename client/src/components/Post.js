import React, {useState, useEffect} from "react";
import '../styles/PostStyles.css'
import CreateOrEditPost from './CreateOrEditPost'
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from "../actions/auth";
import { getPosts } from "../actions/posts";
import * as api from '../api/index.js';



const Post = ( {post} ) => {
    const [post_user, set_post_user] = useState(null)
    const [current_user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    var CreateOrEditPostData = {post: post, active: true}

    useEffect(() => {
    const fetchData = async () => {
        const { data } = await api.fetchUser(post?.creator)
        set_post_user(data);
    }
    fetchData()
        .catch(console.error);;
    }, [])


    var is_current_user_post = false
    var editing_post = true
   //console.log(post_user)
   //console.log(current_user)

   if (current_user?.result?._id === post_user?._id) {
        is_current_user_post = false
   }

    return (
        <div className="post_parent_container">
            {(is_current_user_post === true) && (
                    <button onClick={() => editing_post = true}> edit post </button>
            )}
            {(editing_post === true) && (
                <CreateOrEditPost CreateOrEditPostData={CreateOrEditPostData} />
            )}
            there was a post
        </div>
    )
}


export default Post