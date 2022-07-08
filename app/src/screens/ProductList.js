import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct } from '../actions/productActions'

const ProductList = () => {
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete])

    const createProductHandler = (product) => {

    }

    const deleteHandler = (id) => {
        if (window.confirm("Confirm to delete?")) {
            dispatch(deleteProduct(id))
        }
    }

    return (<>
        <Row className="align-items-center">
            <Col>
                <h4 style={{ fontSize: "1.2rem" }}>Products</h4>
            </Col>
            <Col style={{textAlign:"right"}}>
                <Button className="my-3" onClick={createProductHandler}>Add Product</Button>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(el => (
                        <tr key={el._id}>
                            <td>{el._id}</td>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>{el.category}</td>
                            <td>{el.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${el._id}/edit`}>
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

export default ProductList