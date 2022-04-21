import React, {useState, useEffect} from "react";
import * as api from '../api/index.js';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';


const Comment = ( { comment }  ) => {
    const [comment_user, set_comment_user] = useState(null)
    const [current_user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    
    //console.log( comment)

    useEffect(() => {   
    const fetchData = async () => {
        const { data } = await api.fetchUser(comment?.user_id)
        //console.log(comment)
        set_comment_user(data, comment);
    }
    fetchData()
        .catch(console.error);;
    }, [])

    return (
        <div className="comment_container">
            {comment_user?.profile_image === undefined ? (
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            ):(
                <img alt="profile_img" src={comment_user?.profile_image}/>
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