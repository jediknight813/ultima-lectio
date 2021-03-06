import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import decode from 'jwt-decode'
import Header from './Header';
import '../styles/MainPageStyles.css'
import CreateOrEditPost from './CreateOrEditPost';
import Post from './Post';
import { getPosts } from '../actions/posts';
import * as api from '../api/index.js'


const MainPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const location = useLocation()
    const posts = useSelector((state) => state.posts);
    const [current_user, set_current_user] = useState(undefined)
    
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
            const { data } = await api.fetchUser(user?.result?._id)
            set_current_user(data);
        }
        fetchData()
            .catch(console.error);

            const token = user?.token;


        if (user === null) {
            navigate('/')
        }

        if (token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    }, [])

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        setUser(null)
        localStorage.clear();
        sessionStorage.clear()
        navigate('/')
    }

    const passedFunction = (data) => {
        set_post_to_edit(data)
        set_update_post(true)
    };

    return (
        <div className="main_page_parent"> 
            <Header />
            <div className='center_posts_parent'>
                <div className="center_post_menu_parent">
                    {(current_user !== undefined) && (
                        <img referrerpolicy="no-referrer" alt="profile_image" className="create_post_profile_image" src={current_user?.profile_image}/>
                    )}
                    {(current_user === undefined) && (
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    )}
                    <div className="open_post_menu" onClick={() => set_create_edit_post_menu_status(true)}> <h1> {"What's on your mind "+ user?.result?.username+"?"}</h1> </div>
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

                {(posts.length < 1) && (
                    <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        <h1>Loading..</h1>
                    </div>
                )}

            </div>
            
        </div>
    )

};

export default MainPage;