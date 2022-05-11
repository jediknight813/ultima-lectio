import { USER_ID } from '../constants/actionTypes.js';


// eslint-disable-next-line import/no-anonymous-default-export
export default (user_id = [], action) => {
    switch (action.type) { 
    case USER_ID:
        return action.payload; 
      default:
        return user_id;
    }
  };