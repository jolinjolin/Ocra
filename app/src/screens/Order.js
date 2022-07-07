import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const Order = () => {
    const { id } = useParams()
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()//if not paid, add paypal script
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, id, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult))
    }

    return (
        loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
            <>
                <h4 style={{ fontSize: "1.2rem" }}>ORDER {order._id}</h4>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h4 style={{ fontSize: "1.2rem" }}>SHIPPING</h4>
                                <p>Name: {order.user.name}</p>
                                <p>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p style={{ fontSize: "1rem" }}>Address:
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zipcode}, {order.shippingAddress.country}</p>
                                {order.isDelivered ? <Message variant="success">Delivered on {order.deliverAt}</Message> : (
                                    <Message variant="info">Not delivered</Message>)}
                            </ListGroupItem>
                            <ListGroupItem>
                                <h4 style={{ fontSize: "1.2rem" }}>PAYMENT METHOD</h4>
                                <p style={{ fontSize: "1rem" }}>{order.paymentMethod}</p>
                                {order.isPaid ? <Message variant="success">Paid on {order.paidAt.substring(0, 10)}</Message> : (
                                    <Message variant="info">Not paid</Message>)}
                            </ListGroupItem>
                            <ListGroupItem>
                                <h4 style={{ fontSize: "1.2rem" }} >ORDER ITEMS</h4>
                                {order.orderItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
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
                                    <h4 style={{ fontSize: "1.2rem" }}>ORDER SUMMARY</h4>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping & Handling</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Estimated Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Order Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                {!order.isPaid && (
                                    <ListGroupItem>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                        )}
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
    )
}

export default Order