import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers } from '../actions/userActions'

const UserList = () => {

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    const deleteHandler = (id) => {

    }

    return (<>
        <h4 style={{fontSize: "1.2rem"}}>Users</h4>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(el => (
                        <tr key={el._id}>
                            <td>{el._id}</td>
                            <td>{el.name}</td>
                            <td><a href={`mailto:${el.email}`}>{el.email}</a></td>
                            <td>
                                {el.isAdmin ? (<i className="fas fa-check" style={{ color: "green" }}></i>) : (
                                    <i className="fas fa-times" style={{ color: "red" }}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/user/${el.id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(el._id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
    )
}

export default UserList