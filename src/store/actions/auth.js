import axios from "../../utils/axios";
import {AUTH_SUCCESS, AUTH_LOGOUT} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = ''

        if (isLogin)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo4ne0H0qAIASmOQjX-k-kW6RRUPXRAKs'
        else
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo4ne0H0qAIASmOQjX-k-kW6RRUPXRAKs'


        const response = await axios.post(url, authData);
        const data = response.data

        console.log(data)

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);


        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))

    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const userToken = localStorage.getItem('token')
        if (!userToken)
            dispatch(logout())
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date())
           dispatch(logout())

        // const bodyPayload = {
        //     token : userToken,
        //     returnSecureToken: true
        // }
        //const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBo4ne0H0qAIASmOQjX-k-kW6RRUPXRAKs', bodyPayload)
        //const data = response.data
        //console.log(data)
        if (userToken) {
            dispatch(authSuccess(userToken))
            dispatch(autoLogout(expirationDate))
        } else
            dispatch(logout())
    }
}