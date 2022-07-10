import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Row, ListGroup, Image, Form, Button, Card, ListGroupItem, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
import { Cursor } from 'mongoose'

const Cart = (location) => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const qty = searchParams.get("qty")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const checkoutHandler = (id) => {
        navigate('/shipping')
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return <Row>
        <h4 style={{ fontSize: "1.2rem" }}>SHOPPING CART</h4>
        <Col md={8}>
            {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Back</Link></Message> : (
                <ListGroup variant='flush'>
                    {cartItems.map(el => (
                        <ListGroupItem key={el.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={el.image} alt={el.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${el.product}`}>{el.name}</Link>
                                </Col>
                                <Col md={2}>
                                    {el.price}
                                </Col>
                                <Col md={2}>
                                    <FormControl as='select' value={el.qty} onChange={(e) =>
                                        dispatch(addToCart(el.product, Number(e.target.value)))}>
                                        {[...Array(el.countInStock).keys()].map(el => (
                                            <option key={el + 1} value={el + 1}>
                                                {el + 1}
                                            </option>
                                        ))}
                                    </FormControl>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant="light" onClick={() => removeFromCartHandler(el.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card className='card border-0'>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h6>Subtotal ({Number(cartItems.reduce((acc, cur) => acc + cur.qty, 0))}) items</h6>
                        <div>${cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0).toFixed(2)}</div>
                    </ListGroupItem>
                </ListGroup>
                <ListGroup variant='flush'>
                    <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                        PROCEED TO CHECK OUT
                    </Button>
                </ListGroup>
            </Card>
        </Col>
    </Row>
}

export default Cart