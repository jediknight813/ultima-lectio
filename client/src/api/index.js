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


export const add_comment_to_post = (id, comment) => API.patch(`${"posts/"}${id}/add_comment_to_post`, comment);


export const fetchUsers = () => API.get("users/");
export const createUser = (newUser) => API.post("users/", newUser);
export const LoginCurrentUser = (LoginData) => API.post("users/Login/", LoginData);

export const fetchPostsWithTag = ( tag ) => API.post(`${"tag"}/${tag}`);


export const fetchUser = (id) => API.post(`${"users/getUser"}/${id}`);
export const SignInGoogleUser = (googleId) => API.post("users/google/", googleId);