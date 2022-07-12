import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listRecommendProduct } from '../actions/productActions'
import ItemsCarousel from 'react-items-carousel';

const Carous = () => {
    const dispatch = useDispatch()

    const productRecommend = useSelector(state => state.productRecommend)
    const { loading, error, products } = productRecommend

    useEffect(() => {
        dispatch(listRecommendProduct())
    }, [dispatch])

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <div style={{ padding: `0 ${chevronWidth}px` }} id="carousel-wrap">
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={5}
                gutter={20}
                leftChevron={<button className='carous-btn'>{'<'}</button>}
                rightChevron={<button className='carous-btn'>{'>'}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                {products.map(el => (
                    <div id='carousel'>
                        <Link to={`/product/${el._id}`}>
                            <Image src={el.image} alt={el.name} fluid />
                        </Link>
                    </div>
                ))}
            </ItemsCarousel>
        </div>
    )
}

export default Carous