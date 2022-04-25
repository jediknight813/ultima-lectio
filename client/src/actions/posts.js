import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, ADD_COMMENT_TO_POST, BOOKMARK_POST } from '../constants/actionTypes.js';
import * as api from '../api/index.js';


// action creators
export const getPosts = () =>  async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({type: FETCH_ALL_POSTS, payload: data})
        //return data

    } catch (error) {
        console.log(error)
    }
}


export const createPost = (post) => async (dispatch) => {
  //console.log(post)
    try {
      const { data } = await api.createPost(post);
      //console.log(data)
      dispatch({ type: CREATE_POST, payload: data });

    } catch (error) {
      console.log(error);
    }
  };


  export const updatePost = (id, post) => async (dispatch) => {
    try {
      //console.log(post)
      const { data } = await api.updatePost(id, post);
      //console.log(data)

      dispatch({ type: UPDATE_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };


  export const comment_on_post = (id, comment) => async (dispatch) => {
    try {
      const { data } = await api.add_comment_to_post(id, comment);
  
      dispatch({ type: ADD_COMMENT_TO_POST, payload: data });
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


export const BookMarkPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.bookmarkPost(id);

    dispatch({ type: BOOKMARK_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const getPostsWithTag = (tag) => async (dispach) => {
  try {
      const { data } = await api.fetchPostsWithTag(tag)

      console.log(data)
      return data
  } catch (error) {
      console.log(error)
  }
}