import React from 'react'
import { useCart } from './CartContext';
import "./ProductList.css";

function ProductList({id,name,price,image,quantity,rating,inStock,fastDelivery}) {
    const [{},dispatch]=useCart();
    const addToBasket=()=>{
        dispatch({
            type:'ADD_TO_CART',
            item:{
                id,
                name,
                price,
                image,
                quantity,
                rating
            }
        })
    };
    const addToWishlist=()=>{
        dispatch({
            type:'ADD_TO_WISHLIST',
            item:{
                id,
                name,
                price,
                image,
                quantity,
                rating,
                inStock,
                fastDelivery
            }
        })
    }
    return (
        <>
        <div className="product">
            <div className="product__info">
                <p>{name}</p>
                <p className="product__price">
                    <small>Rs.</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(rating).fill().map((_)=>(
                            <p>⭐</p>
                        ))
                    }
                </div>
                {inStock &&<p>Stock Available</p>}
                {fastDelivery &&<p>Fast delivery Available</p>}
            </div>
           
            <img src={image} alt=""/>
            <button onClick={addToBasket} disabled={!inStock}>Add to Cart</button> 
            <button onClick={addToWishlist}>Add to Wishlist</button>
        </div>
        </>
    )
}

export default ProductList
