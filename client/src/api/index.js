import axios from 'axios';

const url = 'http://localhost:5000/';


export const fetchPosts = () => axios.get(url+"posts/");
export const createPost = (newPost) => axios.post(url+"posts", newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url+"posts/"}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url+"posts"}/${id}`);
export const likePost = (id) => axios.patch(`${url+"posts"}/${id}/likePost`);

export const fetchUsers = () => axios.get(url+"users/");
export const createUser = (newUser) => axios.post(url+"users/", newUser);
export const LoginCurrentUser = (LoginData) => axios.post(url+"users/Login/", LoginData);
