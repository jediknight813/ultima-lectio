import axios from 'axios';

//const url = 'http://localhost:5000/';
const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req
})


export const fetchPosts = () => API.get("posts/");
export const createPost = (newPost) => API.post("posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`${"posts"}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${"posts"}/${id}`);
export const likePost = (id) => API.patch(`${"posts/"}${id}/likePost`);

export const bookmarkPost = (id) => API.patch(`${"users/"}${id}/bookmark`);
export const read_notification = (notification) =>  API.post("/notifications/read_notification/", notification);


export const fetchTags = () => API.get("posts/tags");


export const add_comment_to_post = (id, comment) => API.patch(`${"posts/"}${id}/add_comment_to_post`, comment);


export const fetchUsers = () => API.get("users/");
export const createUser = (newUser) => API.post("users/", newUser);
export const LoginCurrentUser = (LoginData) => API.post("users/Login/", LoginData);
export const fetchPostsWithTag = ( tag ) => API.post(`${"posts/tag"}/${tag}`);
export const fetchPostsWithSearch = ( search ) => API.post(`${"posts/search"}/${search}`);
export const fetchPostWithId = (id) => API.post(`${"posts/getPost"}/${id}`);
export const fetchUserPosts = (id) => API.post(`${"posts/getUserPosts"}/${id}`);
export const fetchUserBookMarkedPosts = (id) => API.post(`${"posts/getUserBookMarkedPosts"}/${id}`);


export const createNotifcation = (newNotifcation) => API.post("notifications/", newNotifcation);
export const update_friend_request_notification = (object) => API.patch(`${"notifications/update_notification"}`, object);


export const remove_friend = (friend) => API.post("notifications/remove_friend", friend);
export const add_friend = (friend) => API.post("notifications/add_friend", friend);

export const updateUserAboutMe = (id) => API.post(`${"users/updateUserAboutMe"}/`, id);


export const fetchUser = (id) => API.post(`${"users/getUser"}/${id}`);
export const SignInGoogleUser = (googleId) => API.post("users/google/", googleId);