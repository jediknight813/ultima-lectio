import { combineReducers } from "redux";
import posts from './posts'
import users from './users'
import userId from "./userId";


export default combineReducers({ posts, users, userId })




