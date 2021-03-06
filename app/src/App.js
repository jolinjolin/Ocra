import React, { Profiler } from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./screens/Home"
import ProductDetail from "./screens/ProductDetail"
import Cart from "./screens/Cart"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './screens/Login'
import Register from "./screens/Register"
import UserProfile from "./screens/UserProfile"
import Shipping from "./screens/Shipping"
import Payment from "./screens/Payment"
import PlaceOrder from "./screens/PlaceOrder"
import Order from "./screens/Order"
import UserList from "./screens/UserList"
import UserEdit from "./screens/UserEdit"
import ProductList from "./screens/ProductList"
import ProductEdit from "./screens/ProductEdit"
import OrderList from "./screens/OrderList"

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/page/:pageNumber' element={<Home />} exact/>
            <Route path='/search/:keyword/page/:pageNumber' element={<Home />} exact/>
            <Route path='/search/:keyword' element={<Home />} exact/>
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/:id' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/order/:id' element={<Order />} />
            <Route path='/admin/userlist' element={<UserList />} />
            <Route path='/admin/user/:id/edit' element={<UserEdit />} />
            <Route path='/admin/productlist' element={<ProductList />} exact/>
            <Route path='/admin/productlist/:pageNumber' element={<ProductList />} exact/>
            <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
            <Route path='/admin/orderlist' element={<OrderList />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
