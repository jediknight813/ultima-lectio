import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Header from "./Header";
import '../styles/tagPageStyles.css'
import { getPostsWithTag } from "../actions/posts";
import { useSelector, useDispatch } from 'react-redux';
import * as api from '../api/index.js'
import Post from './Post';
import CreateOrEditPost from "./CreateOrEditPost";


const DisplayPostsWithTag = () => {
    const [posts, setPosts] = useState(undefined)
    const { id } = useParams()
    const dispatch = useDispatch()
    const [updating_post, set_update_post] = useState(false)
    const [post_to_edit, set_post_to_edit] = useState(null)
    const [create_edit_post_menu, set_create_edit_post_menu_status] = useState(false)
    const [UpdateParent, SetUpdateParentState] = useState(0)
    const [button_pressed, press_button] = useState(0)


    useEffect(() => {   
        const fetchData = async () => {
            const { data } = await api.fetchPostsWithTag(id)
            if (data !== undefined) {
                setPosts(data)
            }
        }
        fetchData()
            .catch(console.error);;
    }, [id, create_edit_post_menu, UpdateParent, button_pressed])


    const passedFunction = (data) => {
        set_post_to_edit(data)
        set_update_post(true)
    };

    const updateParent = () => {
        setTimeout(() => {SetUpdateParentState(updateParent+1)}, "500")
        press_button(button_pressed+1)
    };


    var update_post = {type: "update", post: post_to_edit}

    const close_create_and_edit_post_menu = () => {
        setTimeout(() => { set_update_post(false); }, "500")
        set_create_edit_post_menu_status(false)
    };  

    return (
        <div className="main_page_parent"> 
            <Header />
            <div className='center_posts_parent'>

                {(updating_post === true) && (
                    <div className="create_post_menu_parent">
                        {(updating_post === true) && (
                            <div onClick={() => {set_update_post(false)}} className="check_for_click"></div>    
                        )}
                        <CreateOrEditPost CreateOrEditPostData={update_post} close_create_and_edit_post_menu={close_create_and_edit_post_menu} />
                    </div>
                    )}

                {(posts !== undefined) && (
                    <div style={{"display": "flex", "flexDirection": "column", "gap": "25px"}}>
                        {[...posts].reverse().map((post) => (
                            <Post post={post} func={passedFunction} func2={updateParent} />
                        ))}
                    </div>
                )}
                {(posts === undefined) && (
                    <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        <h1>Loading..</h1>
                    </div>
                )}
            </div>
        </div>
    )

}

export default DisplayPostsWithTag