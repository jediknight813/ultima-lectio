import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import decode from 'jwt-decode'
import Header from './Header';
import '../styles/MainPageStyles.css'
import CreateOrEditPost from './CreateOrEditPost';
import Post from './Post';
import { getPosts } from '../actions/posts';



const MainPage = () => {
    //console.log("here")
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const location = useLocation()
    const posts = useSelector((state) => state.posts);
    
    var CreateOrEditPostData = {type: "create", post: null}
    const [create_edit_post_menu, set_create_edit_post_menu_status] = useState(false)
    const [updating_post, set_update_post] = useState(false)

    const [post_to_edit, set_post_to_edit] = useState(null)


    var update_post = {type: "update", post: post_to_edit}


    const close_create_and_edit_post_menu = () => {
        set_update_post(false)
        set_create_edit_post_menu_status(false)
    };


    useEffect(() => {
        const fetchData = async () => {
            dispatch(getPosts())
        }
        fetchData()
            .catch(console.error);;
    }, [])

    const passedFunction = (data) => {
        //console.log(data)
        set_post_to_edit(data)
        set_update_post(true)
    };

    return (
        <div className="main_page_parent"> 
            <Header />
            <div className='center_posts_parent'>
                <div className="center_post_menu_parent">
                    <img alt="profile_image" className="create_post_profile_image" src={user?.result?.profile_image}/>
                    <div className="open_post_menu" onClick={() => set_create_edit_post_menu_status(true)}> <h1> {"What's on your mind "+ user?.result?.username+"?"}</h1></div>
                </div>

                {(create_edit_post_menu === true) && (
                    <div className="create_post_menu_parent">
                        {(create_edit_post_menu === true) && (
                            <div onClick={() => {set_create_edit_post_menu_status(false)}} className="check_for_click"></div>    
                        )}
                        <CreateOrEditPost CreateOrEditPostData={CreateOrEditPostData} close_create_and_edit_post_menu={close_create_and_edit_post_menu} />
                    </div>
                )}

                {(updating_post === true) && (
                    <div className="create_post_menu_parent">
                        {(updating_post === true) && (
                            <div onClick={() => {set_update_post(false)}} className="check_for_click"></div>    
                        )}
                        <CreateOrEditPost CreateOrEditPostData={update_post} close_create_and_edit_post_menu={close_create_and_edit_post_menu} />
                    </div>
                )}



                {[...posts].reverse().map((post) => (
                    <Post post={post} func={passedFunction} />
                 ))}
            </div>
            
        </div>
    )

};

export default MainPage;