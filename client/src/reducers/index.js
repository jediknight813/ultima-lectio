import { combineReducers } from "redux";
import posts from './posts'
import users from './users'
import userId from "./userId";
import auth from './auth'

export default combineReducers({ posts, users, userId, auth })




