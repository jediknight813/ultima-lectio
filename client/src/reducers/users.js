import { FETCH_ALL_USERS, CREATE_USER, LOGIN_USER, BOOKMARK_POST } from '../constants/actionTypes.js';


// eslint-disable-next-line import/no-anonymous-default-export
export default (users = [], action) => {
    switch (action.type) {
      case FETCH_ALL_USERS:
        return action.payload;   
      case LOGIN_USER:
        return action.payload; 
      case CREATE_USER:
        return [...users, action.payload];
      default:
        return users;
    }
  };