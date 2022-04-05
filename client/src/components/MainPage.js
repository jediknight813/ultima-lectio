import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';


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
        setUser(JSON.parse(localStorage.getItem('profile')))


    }, [location])


    return (
        <div> 
            <h1> {user?.result.email} </h1>
            <img alt='profile img' src={user?.result.imageUrl}/>

            <button onClick={() => logout()}> LOGOUT </button>
        </div>
    )

};

export default MainPage;