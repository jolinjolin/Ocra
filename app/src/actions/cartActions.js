import axios from 'axios'
import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (e) {
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (e) {
    }
}

export const saveShippingAddress = (data) => async (dispatch) => {
    try {
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: data
        })
        localStorage.setItem('shippingAddress', JSON.stringify(data))
    } catch (e) {
    }
}

export const savePayment = (data) => async (dispatch) => {
    try {
        dispatch({
            type: CART_SAVE_PAYMENT,
            payload: data
        })
        localStorage.setItem('paymentMethod', JSON.stringify(data))
    } catch (e) {
    }
}