import React, { useState, useEffect } from "react";
import '../styles/notificationStyles.css'
import Header from "./Header";
import {useNavigate, useLocation} from 'react-router-dom';
import * as api from '../api/index.js'
import NotificationsChild from "./NotificationChild";


const Notifications = () => {
    const navigate = useNavigate()
    const [current_user_data, set_current_user_data] = useState(undefined)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {   
        const fetchData = async () => {
            const { data } = await api.fetchUser(user?.result?._id)
            if (data !== undefined) {
                set_current_user_data(data)
            }
        }
        fetchData()
            .catch(console.error);;
    }, [])
    

    return (
        <div className="notification_page_parent">
            <Header />
            
            <div className="notfications_parent_container">
                {(current_user_data === undefined) && (
                    <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        <h1>Loading..</h1>
                    </div>
                )}

                {(current_user_data?.notifications?.length < 1) && (
                    <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center"}}>
                        <h1>No Notifications</h1>
                    </div>
                )}

                {(current_user_data?.notifications?.length >= 1) && (
                    <div style={{'marginTop': "0px"}} className="notfications_parent_container">
                        <div className="notifications_title_and_button_container">
                            <h1 className="notifications_title_text"> Notifications </h1>
                            <div className="notifications_line"></div>
                        </div>

                        {[...current_user_data.notifications].reverse().map((notification) => (
                            <NotificationsChild notification={notification} />    
                        ))}
                    </div>
                )}

            </div>

        </div>
    )
}

export default Notifications