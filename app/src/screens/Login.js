import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") || '/'
    const navigate = useNavigate()

    const submitHandler = (e) => {
        //dispatch login and refresh
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(userInfo){
            navigate(`${redirect}`)
        }
    }, [userInfo, redirect])

    return <FormContainer>
        <h4>Sign in</h4>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
            <FormGroup controlId="email" style={{margin:"0.2rem 0"}}>
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
            <FormGroup controlId="password" style={{margin:"0.2rem 0"}}>
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
            <Button type="submit" variant="primary" style={{margin:"0.5rem 0"}}>
                Sign in
            </Button>
        </Form>
        <Row className="py-3">
            <Col>
                New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
}

export default Login