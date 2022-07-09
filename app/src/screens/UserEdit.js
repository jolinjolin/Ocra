import React, { useState, useEffect } from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getUserDetail, editUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { USER_EDIT_RESET } from '../constants/userConstants'

const UserEdit = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDetail = useSelector(state => state.userDetail)
    const { loading, error, user } = userDetail
    const userEdit = useSelector(state => state.userEdit)
    const { loading: loadingEdit, error: errorEdit, success: successEdit } = userEdit
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editUser({ id, name, email, isAdmin }))
    }

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: USER_EDIT_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== id) {
                dispatch(getUserDetail(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, id, user])

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">Back</Link>
            <FormContainer>
                <h4 style={{ fontSize: "1.2rem" }}>Edit User</h4>
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
                        <FormGroup controlId="isadmin" style={{ margin: "0.2rem 0" }}>
                            <FormCheck
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                            </FormCheck>
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

export default UserEdit