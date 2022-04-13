import React, {useState, useEffect} from "react";
import  { useSelector,  useDispatch } from 'react-redux';
import '../styles/CreateOrEditPostStyles.css'
import { createPost } from "../actions/posts";
import FileBase from 'react-file-base64';


const CreateOrEditPost = (activate_data) => {
    activate_data = activate_data["CreateOrEditPostData"]
    let random_string = Math.random().toString(30).substring(3,29)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [UserPost, SetUserPost] = useState({_id: random_string, message: "", username: user?.result?.username, creator: user?.result?._id , selectedFile: ""})
    const [create_post_menu, set_create_post_menu_status] = useState(false)
    const dispatch = useDispatch();  


    const CreateNewPost = async (e) => {
        e.preventDefault();
        dispatch(createPost(UserPost));
    };


    useEffect(() => {
        if (activate_data?.post !== null) {
            SetUserPost(activate_data?.post)
            set_create_post_menu_status(true)
        }
    
        if (activate_data?.active === true) {
            set_create_post_menu_status(true)
        }
    }, [activate_data.post, activate_data.active])


    return (
        <div className="center_post_menu_parent">
            <img alt="profile_image" className="create_post_profile_image" src={user?.result?.profile_image}/>
            <div className="open_post_menu" onClick={() => set_create_post_menu_status(true)}> <h1> {"What's on your mind "+ user?.result?.username+"?"}</h1></div>
            
            {(create_post_menu === true) && (
                <div className="create_post_menu_parent">

                {(create_post_menu === true) && (
                    <div onClick={() => set_create_post_menu_status(false)} className="check_for_click"></div>    
                )}

                    <div className="create_post_menu">

                        <form onSubmit={CreateNewPost}>
                            <input required minLength={3} type="text" placeholder="  message" value={UserPost.message} onChange={(e) => SetUserPost({ ...UserPost, message: e.target.value })} />
                            <div style={{"width": "170px"}}> <FileBase type="file" multiple={false} onDone={({ base64 }) => SetUserPost({ ...UserPost, selectedFile: base64 })} /></div>
                            <button type="submit" fullWidth>Submit</button>
                        </form>

                    </div>

                </div>    
            )}
        </div>
    )
}


export default CreateOrEditPost