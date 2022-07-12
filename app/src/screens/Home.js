import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import Carous from '../components/Carous'

const Home = () => {
    var { keyword, pageNumber } = useParams()
    pageNumber = pageNumber ? pageNumber : 1
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            {!keyword && <h4 style={{ fontSize: "1.2rem", marginTop: "8px", color: "#cad160" }}>TOP RATED</h4>}
            {!keyword && <Carous />}
            {!keyword && <h4 style={{ fontSize: "1.2rem", marginTop: "8px", color: "#54de92" }}>NEW IN</h4>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    )
}

export default Home
