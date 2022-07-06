import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import Checkout from '../components/Checkout'

const Shipping = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [ address, setAddress ] = useState(shippingAddress.address)
    const [ city, setCity ] = useState(shippingAddress.city)
    const [ zipcode, setZipcode ] = useState(shippingAddress.zipcode)
    const [ country, setCountry ] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, zipcode, country }))
        navigate("/payment")
    }

    return <FormContainer>
        <Checkout step1 step2/>
        <h4 style={{ fontSize: "1.2rem" }}>SHIPPING</h4>
        <Form onSubmit={submitHandler}>
            <FormGroup controlId="address" style={{ margin: "0.2rem 0" }}>
                <FormLabel>
                    Address
                </FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="city" style={{ margin: "0.2rem 0" }}>
                <FormLabel>
                    City
                </FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="zipcode" style={{ margin: "0.2rem 0" }}>
                <FormLabel>
                    Zipcode
                </FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="country" style={{ margin: "0.2rem 0" }}>
                <FormLabel>
                    Country
                </FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                </FormControl>
            </FormGroup>
            <Button type="submit" variant="primary" style={{ margin: "0.5rem 0" }}>CONTINUE</Button>

        </Form>
    </FormContainer>
}

export default Shipping