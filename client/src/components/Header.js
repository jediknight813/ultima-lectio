import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import '../styles/HeaderStyles.css'
import PageLogo from '../images/pageLogo.png'
import decode from 'jwt-decode'
import * as api from '../api/index.js'


const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [show_settings_drop_down, set_settings_drop_down] = useState(false)
    const [show_nav_drop_down, set_nav_drop_down] = useState(false)
    const [comments, setCommentStatus] = useState({"show": false, "amount": 0})
    const [notifications, setnotificationsStatus] = useState({"show": false, "amount": 0})
    const [unread_notifications, set_unread_notifications]= useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [current_user, set_current_user] = useState(undefined)
    const [searchValue, setSearchValue] = useState()


    useEffect(() => {
        
        const fetchData = async () => {
            const { data } = await api.fetchUser(user?.result?._id)
            //console.log(data)
            set_current_user(data);
            check_notification_status(data)
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
        
        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])


    function check_notification_status(current_user) {
        if (current_user !== null) {
            current_user.notifications.forEach(e => {
                if (e.status === "unread") {
                    set_unread_notifications(true)
                }
            })
        }
    }
    
    
    const logout = () => {
        dispatch({type: 'LOGOUT'})
        setUser(null)
        localStorage.clear();
        sessionStorage.clear()
        navigate('/')
    }

    function search() {
        //console.log("here")
        navigate(`/search/${searchValue.trim()}`)
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
            <img onClick={() => navigate("/mainPage")} className="page_logo" alt="page logo" src={PageLogo}/>

            <div className="navButtonParent">
                <i onClick={() => hide_or_show_nav_menu()} class="fa fa-navicon"> </i>
            </div>

            <button onClick={() => navigate("/mainPage")} className="home_button"> Home </button>
            <button onClick={() => navigate("/Explore")} className="home_button"> Explore </button>

            <div className="searchbar_parent">
                <i class="fa fa-search"></i>

                <form className="search_form_input_parent" onSubmit={search}>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" type="text" />
                </form>

            </div>


            <div className="username_and_image_parent">

                {(unread_notifications === true) && (
                    <div className="header_bell_with_notification_parent">
                        <i style={{color: "rgb(234, 74, 74)", fontSize: "15px", position: "absolute", marginTop: "-4px", marginLeft: "9px"}} class="fa fa-circle"></i>
                        <i onClick={() => navigate("/Notifications")} class="fa fa-bell" ></i>
                    </div>    
                )}
                {(unread_notifications === false) && (
                    <i onClick={() => navigate("/Notifications")} class="fa fa-bell" ></i>
                )}

                <h1 onClick={() => navigate(`/profile/${user?.result?._id}`)} className="username_text"> {user?.result?.username} </h1>
                {(current_user !== undefined) && (
                     <img referrerpolicy="no-referrer" onClick={() => hide_or_show_settings_menu()} className="profile_image" alt="profile img" src={current_user?.profile_image}/>
                )}
                {(current_user === undefined) && (
                     <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                )}
               
            </div>

            {(show_settings_drop_down === true) && (
                <div className="profile_drop_down_menu">
                    <button onClick={() => navigate(`/profile/${user?.result?._id}`)}><i class="fa fa-user-circle-o"></i>profile</button>
                    {(unread_notifications === true) && (
                        <button onClick={() => navigate("/Notifications")}><i style={{color: "rgb(234, 74, 74)", fontSize: "15px", position: "absolute", marginTop: "-4px", marginLeft: "9px"}} class="fa fa-circle"></i> <i class="fa fa-bell"></i>notifications</button>
                    )}
                    {(unread_notifications === false) && (
                        <button onClick={() => navigate("/Notifications")}><i class="fa fa-bell"></i>notifications</button>
                    )}
                    <button onClick={() => logout()}><i class="fa fa-share"></i>logout</button>
                </div>    
            )}

            {(show_nav_drop_down === true) && (
                <div className="nav_drop_down_menu">
                    <button onClick={() => navigate("/mainPage")} ><i class="fa fa-home"></i>home</button>
                    <button onClick={() => navigate("/Explore")} ><i class="fa fa-picture-o"></i>explore</button>
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

//  <button><i class="fa fa-plus"></i>create post</button>
//  <i onClick={() => navigate("/Notifications")} class="fa fa-commenting" ></i>
//  <button onClick={() => navigate("/Notifications")}><i class="fa fa-commenting"></i>comments</button>