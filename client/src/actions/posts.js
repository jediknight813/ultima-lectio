import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST } from '../constants/actionTypes.js';
import * as api from '../api/index.js';


// action creators
export const getPosts = () =>  async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        console.log(data)
        dispatch({type: FETCH_ALL_POSTS, payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
      console.log(data)
      dispatch({ type: CREATE_POST, payload: data });

    } catch (error) {
      console.log(error);
    }
  };


  export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
  
      dispatch({ type: UPDATE_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };


export const deletePost = (id, post) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE_POST, payload: id})
    } catch (error) {
        console.log(error)
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: LIKE_POST, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };