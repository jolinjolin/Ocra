import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getUserDetail, updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.userDetail)
    const { loading, error, user } = userDetail
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") || '/'
    const navigate = useNavigate()

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
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, redirect, user, success])

    return <Row>
        <Col md={3}>
            <h4>User profile</h4>
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
                        Email address
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
                        Confirm password
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
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h4>Orders</h4>
        </Col>
    </Row>
}

export default UserProfile