import React, {useState, useEffect} from "react";
import  { useSelector,  useDispatch } from 'react-redux';
import '../styles/CreateOrEditPostStyles.css'
import { createPost, updatePost } from "../actions/posts";
import FileBase from 'react-file-base64';
import Resizer from "react-image-file-resizer";
import Post from "./Post";
import * as api from '../api/index.js';
import decode from 'jwt-decode'
import {useNavigate, useLocation} from 'react-router-dom';


const CreateOrEditPost = (data) => {
    var activate_data = data["CreateOrEditPostData"]
    let random_string = Math.random().toString(30).substring(3,29)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [current_user, set_current_user] = useState(undefined)
    const [UserPost, SetUserPost] = useState({_id: random_string, message: "", username: user?.result?.username, creator: user?.result?._id , selectedFile: "", tags: ""})
    const navigate = useNavigate()


    const [create_post_menu, set_create_post_menu_status] = useState(false)
    const dispatch = useDispatch();  
    const [image, setImage] = useState()

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        setUser(null)
        localStorage.clear();
        sessionStorage.clear()
        navigate('/')
    }

    useEffect(() => {   
        const fetchData = async () => {
            const { data } = await api.fetchUser(user?.result?._id)
            if (data !== undefined) {
                set_current_user(data);
            }
        }
        fetchData()
            .catch(console.error);;
        }, [])


    const CreateNewPost = async (e) => {
        if (activate_data.post === null) {
            e.preventDefault();
            UserPost.tags = UserPost.tags.map(element => {
                return element.trim();
            });
            dispatch(createPost(UserPost));
            clear()
            data.close_create_and_edit_post_menu()
        } 
        else {
            e.preventDefault();
            UserPost.tags = UserPost.tags.map(element => {
                return element.trim();
            });
            if ( activate_data?.post !== null &&  UserPost.comments === undefined) {
                SetUserPost({ ...UserPost, comments: data.CreateOrEditPostData.post.comments, likes: data.CreateOrEditPostData.post.likes })
            } 
            dispatch(updatePost(UserPost._id, UserPost));
            clear()
            data.close_create_and_edit_post_menu()
        }
    };

    const clear = () => {
        SetUserPost({_id: random_string, message: "", username: user?.result?.username, creator: user?.result?._id , selectedFile: "", tags: "", comments: [], likes: []})
    }


    useEffect(() => {
        if (activate_data?.post !== null) {
            SetUserPost(activate_data?.post)
            set_create_post_menu_status(true)
        }

        const token = user?.token;
        if (user === null) {
            navigate('/')
        }
        if (token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        if (activate_data?.active === true) {
            set_create_post_menu_status(true)
        }
    }, [activate_data.post, activate_data.active])

    var title_text = "Create"
    var upload_photo_button_text = "add a photo"
    var upload_button_text = "Create"

    if (activate_data?.post !== null) {
        title_text = "Update"
        if (activate_data?.post?.selectedFile !== "") {
            upload_photo_button_text = "update photo"
        }
        upload_button_text = "update post"
    }
    
const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            800,
            800,
            "PNG",
            100,
            0,
            (uri) => {
            resolve(uri);
            },
            "base64"
        );
    });

    const LowerImageSize = async (event) => {
        try {
          const file = event.target.files[0];
          const image = await resizeFile(file);
          SetUserPost({ ...UserPost, selectedFile: image })
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div className="create_post_menu">
            <form className="create_post_form_parent" onSubmit={CreateNewPost}>
                <h1>{title_text} Post</h1>
                <div className="post_form_line"></div>
                <div className="create_post_username_and_image">
                    {(current_user !== undefined) && (
                        <img alt="profile_image" src={current_user?.profile_image} />
                    )}
                    {(current_user === undefined) && (
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    )}
                    <h2> {user?.result?.username} </h2>
                </div>
                <textarea className="form_message_text" required minLength={3} type="text" placeholder={"What's on your mind "+ user?.result?.username+"?"} value={UserPost.message} onChange={(e) => SetUserPost({ ...UserPost, message: e.target.value })} />
                <input className="form_tags_input" placeholder="Tags (comma separated)" value={UserPost.tags} onChange={(e) => SetUserPost({ ...UserPost, tags: e.target.value.split(',') })} />
                <input hidden accept="image/png, image/gif, image/jpeg" id="file_for_image" type="file" multiple={false} onChange={(e) => LowerImageSize(e)} /> 
                <div onClick={() => document.getElementById("file_for_image").click()} className="add_image_to_post_button"> {upload_photo_button_text} </div>
                <button className="submit_or_update_post" type="submit"> {upload_button_text} </button>
            </form>
        </div> 
    )
}


export default CreateOrEditPost