import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./screens/Home"
import ProductDetail from "./screens/ProductDetail"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} exact/>
            <Route path='/product/:id' element={<ProductDetail />} exact/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
