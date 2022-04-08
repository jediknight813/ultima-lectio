import React from "react";
import { useState } from "react";
import '../styles/HeaderStyles.css'
import PageLogo from '../images/pageLogo.png'


const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))


    return (
        <div className="HeaderParent">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <img className="page_logo" alt="page logo" src={PageLogo}/>

            <div className="navButtonParent">
                <i class="fa fa-navicon"> </i>
            </div>

            <button className="home_button"> Home </button>
            <button className="home_button"> Explore </button>

            <div className="searchbar_parent">
                <i class="fa fa-search"></i>
                <input placeholder="Search" type="text" />
            </div>

            <div className="username_and_image_parent">
                <h1 className="username_text"> {user?.result?.username} </h1>
                <img className="profile_image" alt="profile img" src={user?.result?.profile_image}/>
            </div>
        </div>
    )
}

export default Header