import React from 'react'
import "./WishList.css";
import {useCart} from "./CartContext";

function Wish({id,name,price,image,quantity,rating,inStock,fastDelivery}) {
    const [{wishlist},dispatch]=useCart();
    const addToBasket=()=>{
        dispatch({
            type:'ADD_TO_CART_WISHLIST',
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
    return (
        <div className="wishlist">
                <div className="wishlist_wrapper">
                    <img className="checkoutCart_image" src={image} alt=""/>
                    <div className="wishlist_info">
                        <p className="checkoutCart_title">{name}</p>

                        <p className="checkoutCart_price">
                            <small>Rs.</small>
                            <strong>{price}</strong>
                        </p>
                        <div className="checkoutCart_rating">
                        {
                        Array(rating).fill().map((_)=>(
                            <p>⭐</p>
                        ))
                    }
                        </div>
                <button className="btn-cart" onClick={addToBasket} disabled={!inStock}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Wish


