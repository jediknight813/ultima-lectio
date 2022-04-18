import React, {useState, useEffect} from "react";
import  { useSelector,  useDispatch } from 'react-redux';
import '../styles/CreateOrEditPostStyles.css'
import { createPost, updatePost } from "../actions/posts";
import FileBase from 'react-file-base64';


const CreateOrEditPost = (activate_data) => {
    activate_data = activate_data["CreateOrEditPostData"]
    console.log(activate_data)
    let random_string = Math.random().toString(30).substring(3,29)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))


    const [UserPost, SetUserPost] = useState({_id: random_string, message: "", username: user?.result?.username, creator: user?.result?._id , selectedFile: "", tags: ""})
    const [create_post_menu, set_create_post_menu_status] = useState(false)
    const dispatch = useDispatch();  
    

    const CreateNewPost = async (e) => {
        if (activate_data.post === null) {
            e.preventDefault();
            dispatch(createPost(UserPost));
            clear()
            set_create_post_menu_status(false)
        } 
        else {
            e.preventDefault();
            dispatch(updatePost(UserPost));
            clear()
        }
        
    };

    const clear = () => {
        SetUserPost({_id: random_string, message: "", username: user?.result?.username, creator: user?.result?._id , selectedFile: "", tags: ""})
    }


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
                    <div onClick={() => {set_create_post_menu_status(false); clear() }} className="check_for_click"></div>    
                )}

                    <div className="create_post_menu">

                        <form className="create_post_form_parent" onSubmit={CreateNewPost}>
                            <h1>Create Post</h1>
                            <div className="post_form_line"></div>
                            <div className="create_post_username_and_image">
                                <img alt="profile_image" src={user?.result?.profile_image} />
                                <h2> {user?.result?.username} </h2>
                            </div>
                            <textarea className="form_message_text" required minLength={3} type="text" placeholder={"What's on your mind "+ user?.result?.username+"?"} value={UserPost.message} onChange={(e) => SetUserPost({ ...UserPost, message: e.target.value })} />
                            <input className="form_tags_input" placeholder="Tags (comma separated)" fullWidth value={UserPost.tags} onChange={(e) => SetUserPost({ ...UserPost, tags: e.target.value.split('#') })} />
                            
                            <input hidden accept="image/png, image/gif, image/jpeg" id="file" type="file" multiple={false} onDone={({ base64 }) => SetUserPost({ ...UserPost, selectedFile: base64 })} /> 
                            <div onClick={() => document.getElementById("file").click()} className="add_image_to_post_button"> add a photo </div>

                            <button className="submit_or_update_post" type="submit" fullWidth> Create </button>
                        </form>

                    </div>

                </div>    
            )}
        </div>
    )
}


export default CreateOrEditPost