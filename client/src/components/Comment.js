import React, {useState, useEffect} from "react";
import * as api from '../api/index.js';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {useNavigate, useLocation} from 'react-router-dom';


const Comment = ( { comment }  ) => {
    const [comment_user, set_comment_user] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {   
        const fetchData = async () => {
            const { data } = await api.fetchUser(comment?.user_id)
            set_comment_user(data, comment);
        }
        fetchData()
            .catch(console.error);;
        }, [comment?.user_id])

    return (
        <div className="comment_container">
            {comment_user?.profile_image === undefined ? (
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            ):(
                <img style={{"cursor": "pointer"}} onClick={() => navigate(`/profile/${comment_user?._id}`)} referrerpolicy="no-referrer" alt="profile_img" src={comment_user?.profile_image}/>
            )}

            <div>
                <h1>{comment_user?.username}</h1>
                <h2>{moment(comment.createdAt).fromNow()}</h2>
                <h3>{comment.comment}</h3>
            </div>

        </div>
    )

}


export default Comment