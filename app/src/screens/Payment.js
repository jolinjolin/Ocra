import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup, FormControl, FormLabel, Col, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePayment } from '../actions/cartActions'
import Checkout from '../components/Checkout'

const Payment = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const navigate = useNavigate()
    if (!shippingAddress) {
        navigate("/shipping")
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePayment({ paymentMethod }))
        navigate("/placeorder")
    }

    return <FormContainer>
        <Checkout step1 step2 step3 />
        <h4>Payment method</h4>
        <Form onSubmit={submitHandler}>
            <FormGroup style={{ margin: "0.2rem 0" }}>
                <FormLabel as="legend"></FormLabel>
                <Col>
                    <FormCheck
                        style={{ fontSize: "1rem" }}
                        type="radio"
                        label="Paypal or Credit card"
                        id="Paypal"
                        name="paymentMethod"
                        value="Paypal"
                        defaultChecked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </FormCheck>
                </Col>
            </FormGroup>
            <Button type="submit" variant="primary" style={{ margin: "0.5rem 0" }}>Continue</Button>

        </Form>
    </FormContainer>
}

export default Payment