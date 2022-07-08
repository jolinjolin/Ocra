import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        const { userLogin } = getState()
        const userInfo = userLogin.userInfo
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/products/${id}`, config)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
        console.log(err)
    }
}

export const addProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_ADD_REQUEST })
        const { userLogin } = getState()
        const userInfo = userLogin.userInfo
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products`, {}, config)
        dispatch({
            type: PRODUCT_ADD_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_ADD_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
        console.log(err)
    }
}