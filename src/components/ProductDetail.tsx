import React from 'react';
import Loading from './Loading';
import Button from "./Button"
import { useState } from 'react';
import { useFetch } from '../Functions/useFetch';
import { usePost } from '../Functions/usePost';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { AddedToCart } from './../redux/cartSlice'

const ProductDetail = () => {
    const [userId, setUserId] = useState('')

    const productID = Number(useParams().productID) || 0;

    const {data: product, fetchLoading, fetchError} = useFetch('products/' + productID);

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const navigate = useNavigate();
    const handleShowProducts = () => {
        navigate('/products');
    };

    const handleAddToCart = (productID, productTitle) => {
        dispatch(AddedToCart('1', productID, productTitle))
    }
    
    if(fetchError != undefined && fetchError.length > 0) { return <p style={{ textAlign:'center'}}>An error occurres {fetchError}</p>; };

    if (fetchLoading) { return <Loading /> }

    return (
        <>
            {Object.keys(product).length > 0 ? (
                <>
                    <div className='row align-items-center'>
                        <img src={product['image']} className="col-auto" style={{width: 250, height: 250}}/>
                        <div className="col text-light">
                            <p className='row'>Title: <b>{product['title']}</b></p>

                            <p className='row'>Price: <b>${product['price']}</b></p>

                            <p className='row'>Category: <b>{product['category']}</b></p>

                            <p className='row'>Description: <b>{product['description']}</b></p>

                            <p className='row'>Rating: <b>{product['rating']['rate']} with {product['rating']['count']} reviews</b></p>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <a id="btn" onClick={() => handleAddToCart(product['id'], product['title'])} className="btn btn-primary">Add To Cart</a>
                        <a id="btn" onClick={handleShowProducts} className="btn btn-primary">Go Back</a>
                    </div>
                </>
            )
            : undefined}
        </>
    );
};
  
export default ProductDetail;