import React from "react";
import '../styles/notificationStyles.css'
import Header from "./Header";
import {useNavigate, useLocation} from 'react-router-dom';


const Notifications = () => {
    const navigate = useNavigate()

    
    return (
        <div>
            <Header />
            notifications
        </div>
    )
}


export default Notifications