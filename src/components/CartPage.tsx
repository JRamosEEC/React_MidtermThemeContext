import React from 'react';
import Loading from './Loading';
import Button from "./Button"
import { useState } from 'react';
import { useFetch } from '../Functions/useFetch';
import { usePost } from '../Functions/usePost';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { AddedToCart } from '../redux/cartSlice'

const ProductDetail = () => {
    const [userId, setUserId] = useState('')

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const cart = useSelector(state => state.cart)

    const navigate = useNavigate();


    return (
        <>
            {Object.keys(cart).length > 0 ? (cart.map( item => { 
                return (
                    <div key={item.id} style={{ color: 'white' }}><p>{item.productTitle}</p></div>
                );
            })) : (<div style={{ color: 'white' }}>Your cart is empty!</div>)}
        </>
    );
}
  
export default ProductDetail;