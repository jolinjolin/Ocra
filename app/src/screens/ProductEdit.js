import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { listProductDetails, editProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { PRODUCT_EDIT_RESET } from '../constants/productConstants'

const ProductEdit = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    const productEdit = useSelector(state => state.productEdit)
    const { loading: loadingEdit, error: errorEdit, success: successEdit } = productEdit

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editProduct({
            _id: id,
            name,
            price,
            brand,
            image,
            category,
            description,
            countInStock
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (err) {
            console.log(err)
            setUploading(false)
        }
    }

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: PRODUCT_EDIT_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== id) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
        }
    }, [dispatch, navigate, id, product, successEdit])

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">Back</Link>
            <FormContainer>
                <h4 style={{ fontSize: "1.2rem" }}>Edit Product</h4>
                {loadingEdit && <Loader />}
                {errorEdit && <Message variant="danger">{errorEdit}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
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
                                Price
                            </FormLabel>
                            <FormControl
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="image" style={{ margin: "0.2rem 0" }}>
                            <FormLabel>
                                Image url
                            </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <Form.Group controlId="imageFile" className="mb-3">
                            <Form.Label>Choose File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader />}
                        </Form.Group>
                        <FormGroup controlId="brand" style={{ margin: "0.2rem 0" }}>
                            <FormLabel>
                                Brand
                            </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="category" style={{ margin: "0.2rem 0" }}>
                            <FormLabel>
                                category
                            </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="description" style={{ margin: "0.2rem 0" }}>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="countInStock" style={{ margin: "0.2rem 0" }}>
                            <FormLabel>
                                Count In Stock
                            </FormLabel>
                            <FormControl
                                type="number"
                                placeholder="Enter product quantities"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <Button type="submit" variant="primary" style={{ margin: "0.5rem 0" }}>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEdit