import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { listUserOrder, listUserOrders } from '../actions/orderActions'
import { getUserDetail, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const userDetail = useSelector(state => state.userDetail)
    const { loading, error, user } = userDetail
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
    const orderListUser = useSelector(state => state.orderListUser)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListUser

    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") || '/'
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetail('profile'))
                dispatch(listUserOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, redirect, user, success])

    return <Row>
        <Col md={3}>
            <h4 style={{ fontSize: "1.2rem" }}>USER PROFILE</h4>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile updated</Message>}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="name" style={{ margin: "0.2rem 0" }}>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <FormControl
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="email" style={{ margin: "0.2rem 0" }}>
                    <FormLabel>
                        Email Address
                    </FormLabel>
                    <FormControl
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="password" style={{ margin: "0.2rem 0" }}>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="confirmPassword" style={{ margin: "0.2rem 0" }}>
                    <FormLabel>
                        Confirm Password
                    </FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </FormControl>
                </FormGroup>
                <Button type="submit" variant="primary" style={{ margin: "0.5rem 0" }}>
                    UPDATE
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h4 style={{ fontSize: "1.2rem" }}>ORDERS</h4>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(el => (
                            <tr key={el._id}>
                                <td>{el._id}</td>
                                <td>{el.createdAt.substring(0, 10)}</td>
                                <td>{el.totalPrice}</td>
                                <td>{el.isPaid ? (el.paidAt.substring(0, 10)) : (
                                    <i className="fas fa-times" style={{ color: "red" }}></i>
                                )}</td>
                                <td>{el.isDelivered ? (el.deliveredAt.substring(0, 10)) : (
                                    <i className="fas fa-times" style={{ color: "red" }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${el._id}`}>
                                        <Button className="btn-sm" variant="light">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
}

export default UserProfile