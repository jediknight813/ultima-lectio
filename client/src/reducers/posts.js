import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, ADD_COMMENT_TO_POST } from '../constants/actionTypes.js';


// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
    switch (action.type) {
      case FETCH_ALL_POSTS:
        return action.payload;
      case ADD_COMMENT_TO_POST:
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      case LIKE_POST:
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      case CREATE_POST:
        return [...posts, action.payload];
      case UPDATE_POST:
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      case DELETE_POST:
        return posts.filter((post) => post._id !== action.payload);
      default:
        return posts;
    }
  };