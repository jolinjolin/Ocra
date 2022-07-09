import React, { useState } from 'react'
import { Form, Button, FormControl, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const Search = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      <Row className="ms-auto">
        <Col xs="auto" style={{ padding: "0 0.2rem" }}>
          <FormControl
            type="text"
            name="q"
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search"
            className="mr-sm-2 ml-sm-5"
          >
          </FormControl>
        </Col>
        <Col xs="auto" style={{ padding: "0 0.2rem" }}>
          <Button style={{ height: "2.3rem", width: "2.3rem" }} type="submit" variant="outline-info" className="btn-sm">
            <i className="fas fa-search"></i>
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Search