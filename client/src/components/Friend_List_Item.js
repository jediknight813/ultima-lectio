import React, { useState, useEffect } from "react";
import '../styles/FriendListItemStyles.css'
import * as api from '../api/index.js';
import { useNavigate } from "react-router-dom";


const FriendListItem = ({ friend_id }) => {
    const [friend_data, set_friend_data] = useState(undefined)
    //console.log(friend_id)
    const navigate = useNavigate()
    
    useEffect(() => {   
        const fetchData = async () => {
            const { data } = await api.fetchUser(friend_id)
            set_friend_data(data);
        }
        fetchData()
            .catch(console.error);;
        }, [friend_id])


    return (
        <div>
            {friend_data === undefined ? (
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                ):(
                <div onClick={() => navigate(`/profile/${friend_id}`)} className="friend_list_item_parent_container">
                    <img alt="profile_image" src={friend_data.profile_image}/>
                    <h1>{friend_data.username}</h1>
                </div>
                )}
        </div>
    )
}


export default FriendListItem