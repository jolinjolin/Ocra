import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL, PRODUCT_ADD_RESET,
    PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_RESET,
    PRODUCT_ADD_REVIEW_REQUEST, PRODUCT_ADD_REVIEW_SUCCESS, PRODUCT_ADD_REVIEW_FAIL, PRODUCT_ADD_REVIEW_RESET
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products, pages: action.payload.pages, page: action.payload.page }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true, }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productAddReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ADD_REQUEST:
            return { loading: true, }
        case PRODUCT_ADD_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_ADD_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_ADD_RESET:
            return {}
        default:
            return state
    }
}

export const productEditReducer = (state = { produt: {} }, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            return { loading: true, }
        case PRODUCT_EDIT_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_EDIT_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productReviewAddReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ADD_REVIEW_REQUEST:
            return { loading: true, }
        case PRODUCT_ADD_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_ADD_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_ADD_REVIEW_RESET:
            return {}
        default:
            return state
    }
}