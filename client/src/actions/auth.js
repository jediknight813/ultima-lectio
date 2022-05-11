import { AUTH, FETCH_USER } from '../constants/actionTypes.js';
import * as api from '../api/index.js';


export const signin = (formData, navigate) => async (dispach) => {
    try {
        const { data } = await api.LoginCurrentUser(formData)
        dispach({ type: AUTH, data})

        navigate('/mainPage')
    } catch (error) {
        console.log(error)
    }
}


export const signup = (formData, navigate) => async (dispach) => {
    try {
        const { data } = await api.createUser(formData)
        
        dispach({ type: AUTH, data})

        navigate('/mainPage')
    } catch (error) {
        console.log(error)
    }
}


export const LoginGoogleUser = (googleId, navigate) => async (dispach) => {
    try {

        const { data } = await api.SignInGoogleUser(googleId)

        dispach({ type: AUTH, data})
  
        navigate('/mainPage')

    } catch (error) {
        console.log(error)
    }
  }


export const getUser = (id) => async (dispach) => {
    try {
        const { data } = await api.fetchUser(id)

       console.log(data)

        dispach({ type: FETCH_USER, data})

    } catch (error) {
        console.log(error)
    }
}
