import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./screens/Home"
import ProductDetail from "./screens/ProductDetail"
import Cart from "./screens/Cart"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './screens/Login'
import Register from "./screens/Register"

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/:id' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
