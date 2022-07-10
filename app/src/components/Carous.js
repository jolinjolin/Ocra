import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listRecommendProduct } from '../actions/productActions'

const Carous = () => {
    const dispatch = useDispatch()

    const productRecommend = useSelector(state => state.productRecommend)
    const { loading, error, products } = productRecommend

    useEffect(() => {
        dispatch(listRecommendProduct())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Carousel pause="hover" >
            {products.map(el => (
                <Carousel.Item key={el._id}>
                    <Link to={`/product/${el._id}`}>
                        <Image src={el.image} alt={el.name} fluid />
                        <Carousel.Caption className="carousel-caption">
                            <h4 style={{ fontSize: "1.2rem" }}>{el.name} ${el.price}</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default Carous