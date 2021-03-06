import axios from 'axios'
import { ORDER_LIST_USER_RESET } from '../constants/orderConstants'
import {
    USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS,
    USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_RESET, USER_DETAIL_SUCCESS,
    USER_EDIT_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS,
    USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS,
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
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('userInfo')
        dispatch({ type: USER_LOGOUT })
        dispatch({ type: USER_DETAIL_RESET })
        dispatch({ type: ORDER_LIST_USER_RESET })
        dispatch({ type: USER_LIST_RESET })
    } catch (err) {
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
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })
        const { userLogin } = getState()
        const userInfo = userLogin.userInfo
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/users', config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })
        const { userLogin } = getState()
        const userInfo = userLogin.userInfo
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`, config)
        dispatch({
            type: USER_DELETE_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const editUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_EDIT_REQUEST })
        const { userLogin } = getState()
        const userInfo = userLogin.userInfo
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/${user.id}`, user, config)
        dispatch({
            type: USER_EDIT_SUCCESS,
        })
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USER_EDIT_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}