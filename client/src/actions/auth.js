import { AUTH } from '../constants/actionTypes.js';
import * as api from '../api/index.js';


export const signin = (formData, navigate) => async (dispach) => {
    try {
        const { data } = await api.LoginCurrentUser(formData)
        console.log(data)
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