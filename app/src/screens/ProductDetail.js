import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import Rating from "../components/Rating"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { listProductDetails, addProductReview } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { PRODUCT_ADD_REVIEW_RESET } from "../constants/productConstants"

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    const productReviewAdd = useSelector(state => state.productReviewAdd)
    const { error: errorProductReview, success: successProductReview } = productReviewAdd

    const dispatch = useDispatch()
    useEffect(() => {
        if (successProductReview) {
            alert("Review submitted")
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_ADD_REVIEW_RESET })
        }
        dispatch(listProductDetails(id))
    }, [dispatch, id, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addProductReview(id, { rating, comment }))
    }

    return <>
        <Link className="btn btn-light my-3" to='/'>
            BACK
        </Link>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h4>{product.name}</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
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
                                                    {[...Array(product.countInStock).keys()].map(el => (
                                                        <option key={el + 1} value={el + 1}>
                                                            {el + 1}
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
                </Row>
                <Row>
                    <Col md={6} style={{ marginTop: "2rem" }}>
                        <h4 style={{ fontSize: "1.2rem" }}>REVIEWS</h4>
                        {product.reviews.length === 0 && <Message>No reviews</Message>}
                        <ListGroup variant="flush">
                            {product.reviews.map(el => (
                                <ListGroupItem key={el._id}>
                                    <strong>{el.name}</strong>
                                    <Rating value={el.rating} />
                                    <p>{el.createdAt && el.createdAt.substring(0, 10)}</p>
                                    <p>{el.comment}</p>
                                </ListGroupItem>
                            ))}
                            <ListGroupItem>
                                <h5 style={{ fontSize: "1rem" }}>WRITE A REVIEW</h5>
                                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <FormGroup controlId="rating">
                                            <FormLabel>Rating</FormLabel>
                                            <FormControl
                                                as="select"
                                                value={rating}
                                                onChange={e => setRating(e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1 Star</option>
                                                <option value="2">2 Star</option>
                                                <option value="3">3 Star</option>
                                                <option value="4">4 Star</option>
                                                <option value="5">5 Star</option>
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup controlId="comment" style={{ marginTop: "0.3rem" }}>
                                            <FormLabel>Comment</FormLabel>
                                            <FormControl
                                                as="textarea"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                            >
                                            </FormControl>
                                        </FormGroup>
                                        <Button style={{ marginTop: "1rem" }} type="submit" variant="primary">SUBMIT</Button>
                                    </Form>
                                ) : <Message>Login <Link to="/login">to write a review</Link></Message>}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </>
        )}
    </>
}

export default ProductDetail