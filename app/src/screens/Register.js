import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") || '/'
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    useEffect(() => {
        if (userInfo) {
            navigate(`${redirect}`)
        }
    }, [userInfo, redirect])

    return <FormContainer>
        <h4 style={{ fontSize: "1.2rem" }}>SIGN UP</h4>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
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
                Register
            </Button>
        </Form>
        <Row className="py-3">
            <Col>
                Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
}

export default Register