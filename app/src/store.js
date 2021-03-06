import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productAddReducer, productEditReducer, productReviewAddReducer, productRecommendReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { userDeleteRducer, userDetailReducer, userEditRducer, userListeducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers.js'
import { oderListUserReducer, oderPayReducer, orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer } from './reducers/orderReducers.js'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productAdd: productAddReducer,
    productEdit: productEditReducer,
    productReviewAdd: productReviewAddReducer,
    productRecommend: productRecommendReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListeducer,
    userDelete: userDeleteRducer,
    userEdit: userEditRducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: oderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListUser: oderListUserReducer,
    orderList: orderListReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store