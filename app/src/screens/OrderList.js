import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'

const OrderList = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderList = useSelector(state => state.orderList)
    var { loading, error, orders } = orderList

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])


    return (<>
        <h4 style={{ fontSize: "1.2rem" }}>Orders</h4>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
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
                            <td>{el.user && el.user.name}</td>
                            <td>{el.createdAt.substring(0, 10)}</td>
                            <td>${el.totalPrice}</td>
                            <td>
                                {el.isPaid ? (
                                    el.paidAt.substring(0, 10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {el.isDelivered ? (
                                    el.deliveredAt.substring(0, 10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/order/${el._id}`}>
                                    <Button variant="light" className="btn-sm">
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
    )
}

export default OrderList