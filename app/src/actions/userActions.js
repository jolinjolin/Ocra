import axios from 'axios'
import {
    USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS,
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', { email, password }, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
        console.log(err)
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('userInfo')
        dispatch({ type: USER_LOGOUT })
    } catch (err) {
        console.log(err)
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users', { name, email, password }, config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
        console.log(err)
    }
}

export const getUserDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAIL_REQUEST })
        const { userLogin } = getState()
        const userInfo = userLogin.userInfo
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
        console.log(err)
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const { userLogin } = getState()
        const userInfo = userLogin.userInfo
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/profile`, user, config)
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const message = err.response && err.response.data.message ? err.response.data.message : err.message
        if (message === "Not authorized, token failed") {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
        console.log(err)
    }
}