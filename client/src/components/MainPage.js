import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import decode from 'jwt-decode'
import Header from './Header';
import '../styles/MainPageStyles.css'
import CreateOrEditPost from './CreateOrEditPost';


const MainPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const location = useLocation()


    var CreateOrEditPostData = {post: null, active: false}

    return (
        <div className="main_page_parent"> 
            <Header />
            <div className='center_posts_parent'>
                <CreateOrEditPost CreateOrEditPostData={CreateOrEditPostData} />
            </div>
            
        </div>
    )

};

export default MainPage;