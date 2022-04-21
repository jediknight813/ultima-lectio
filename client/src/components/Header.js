import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import '../styles/HeaderStyles.css'
import PageLogo from '../images/pageLogo.png'
import decode from 'jwt-decode'


const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [show_settings_drop_down, set_settings_drop_down] = useState(false)
    const [show_nav_drop_down, set_nav_drop_down] = useState(false)
    const [comments, setCommentStatus] = useState({"show": false, "amount": 0})
    const [notifications, setnotificationsStatus] = useState({"show": false, "amount": 0})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()


    function check_comment_and_notification_status() {

    }

    useEffect(() => {
        const token = user?.token;

        if (user === null) {
            navigate('/')
        }

        if (token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
    
    const logout = () => {
        dispatch({type: 'LOGOUT'})
        setUser(null)
        localStorage.clear();
        sessionStorage.clear()
        navigate('/')
    }


    function hide_or_show_settings_menu() {
        if (show_settings_drop_down === true) {
            set_settings_drop_down(false)
        }
        else {
            set_settings_drop_down(true)
        }
    }

    function hide_or_show_nav_menu() {
        if (show_nav_drop_down === true) {
            set_nav_drop_down(false)
        }
        else {
            set_nav_drop_down(true)
        }
    }

    return (
        <div className="HeaderParent">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <img className="page_logo" alt="page logo" src={PageLogo}/>

            <div className="navButtonParent">
                <i onClick={() => hide_or_show_nav_menu()} class="fa fa-navicon"> </i>
            </div>

            <button onClick={() => navigate("/mainPage")} className="home_button"> Home </button>
            <button onClick={() => navigate("/mainPage")} className="home_button"> Explore </button>

            <div className="searchbar_parent">
                <i class="fa fa-search"></i>
                <input placeholder="Search" type="text" />
            </div>


            <div className="username_and_image_parent">
                <i onClick={() => navigate("/Notifications")} class="fa fa-commenting" ></i>
                <i onClick={() => navigate("/Notifications")} class="fa fa-bell" ></i>
                <h1 className="username_text"> {user?.result?.username} </h1>
                <img onClick={() => hide_or_show_settings_menu()} className="profile_image" alt="profile img" src={user?.result?.profile_image}/>
            </div>

            {(show_settings_drop_down === true) && (
                <div className="profile_drop_down_menu">
                    <button><i class="fa fa-user-circle-o"></i>profile</button>
                    <button><i class="fa fa-plus"></i>create post</button>
                    <button onClick={() => navigate("/Notifications")}><i class="fa fa-commenting"></i>comments</button>
                    <button onClick={() => navigate("/Notifications")}><i class="fa fa-bell"></i>notifications</button>
                    <button onClick={() => logout()}><i class="fa fa-share"></i>logout</button>
                </div>    
            )}

            {(show_nav_drop_down === true) && (
                <div className="nav_drop_down_menu">
                    <button><i class="fa fa-home"></i>home</button>
                    <button><i class="fa fa-picture-o"></i>explore</button>
                </div>    
            )}


            {( show_settings_drop_down === true || show_nav_drop_down === true ) && (
                <div onClick={() => {set_nav_drop_down(false); set_settings_drop_down(false)}} className="hide_menus_when_clicked">    
                </div>    
            )}

        </div>
    )
}

export default Header