import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import decode from 'jwt-decode'
import Header from './Header';


const MainPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const location = useLocation()


    const logout = () => {
        dispatch({type: 'LOGOUT'})
        setUser(null)
        navigate('/')
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    return (
        <div> 
            <Header />
            <h1> {user?.result.username} </h1>
            <img alt='profile img' src={user?.result.profile_image} />
            <button onClick={() => logout()}> LOGOUT </button>


        </div>
    )

};

export default MainPage;