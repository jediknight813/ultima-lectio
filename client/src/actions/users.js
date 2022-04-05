import { FETCH_ALL_USERS, CREATE_USER, LOGIN_USER, USER_ID} from '../constants/actionTypes.js';
import * as api from '../api/index.js';


// action creators
export const getUsers = () =>  async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        console.log(data)
        dispatch({type: FETCH_ALL_USERS, payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const createNewUserForDb = (post) => async (dispatch) => {
    try {
      const { data } = await api.createUser(post);
      console.log(data)
      dispatch({ type: CREATE_USER, payload: data });

    } catch (error) {
      console.log(error);
    }
  };



  export const Loginuser = (user) => async (dispatch) => {
    try {
        const { data } = await api.LoginCurrentUser(user);
        console.log(data)
        //dispatch({ type: CREATE_USER, payload: data });

        dispatch({ type: USER_ID, payload: data });

        return data


        } catch (error) {
            console.log(error);
        }
  };
