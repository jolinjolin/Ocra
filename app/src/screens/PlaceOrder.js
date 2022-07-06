import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Checkout from '../components/Checkout'
import { createOrder } from "../actions/orderActions"

const PlaceOrder = () => {
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 9.9)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const dispatch = useDispatch()
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    }, [navigate, success])

    return (
        <>
            <Checkout step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h4 style={{ padding: "1rem 0" }}>Shipping</h4>
                            <p style={{ fontSize: "1.2rem" }}>Address</p>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.zipcode}, {cart.shippingAddress.country}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4 style={{ padding: "1rem 0" }}>Payment method</h4>
                            <p style={{ fontSize: "1.2rem" }}></p>
                            {cart.paymentMethod}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4 style={{ padding: "1rem 0" }}>Order items</h4>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h4>Order summary</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    style={{ margin: "0 4rem" }}
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems == 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place order
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrder