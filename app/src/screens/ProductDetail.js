import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form, FormControl } from "react-bootstrap"
import Rating from "../components/Rating"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { listProductDetails } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
}

    return <>
        <Link className="btn btn-light my-3" to='/'>
            BACK
        </Link>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <h4>{product.name}</h4>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Rating value={product.rating || 0} text={`${product.numReviews} review`}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        Price: ${product.price}
                    </ListGroupItem>
                    <ListGroupItem>
                        Description: {product.description}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        {product.countInStock > 0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <FormControl as='select' value={qty} onChange={(e) =>
                                            setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(el =>(
                                                <option key={el+1} value={el+1}>
                                                    {el+1}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )}
                        <ListGroupItem>
                            <Row>
                                <Button 
                                className='btn-block btn-primary' 
                                type='button' 
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                                >
                                    ADD TO CART
                                </Button>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>}
    </>
}

export default ProductDetail