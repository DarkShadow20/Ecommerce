import React from 'react'
import {useCart} from "./CartContext.js";
import "./CheckoutCart.css";

function CheckoutCart({id,title,price,image,quantity,rating}) {
    const [{},dispatch]=useCart();
    const removeFromCart=()=>{
        dispatch({
            type:'REMOVE_FROM_CART',
            id:id
        })
    }
    const addQuantity=()=>{
        dispatch({
            type:'ADD_QUANTITY',
            id
        })
    }
    const subtractQuantity = () => {
        dispatch( {
          type: 'SUB_QUANTITY',
          id,
        })
      };
    return (
        <div className="checkoutCart">
            <img className="checkoutCart_image" src={image} alt=""/>
            <div className="checkoutCart_info">
                <p className="checkoutCart_title">{title}</p>

                <p className="checkoutCart_price">
                    <small>Rs.</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutCart_rating">
                    {Array(rating).fill().map((_)=>(
                        <p >⭐</p>
                    ))}
                </div>
                <div className="checkoutCart_quantity">
                    <button onClick={addQuantity} >+</button>
                    <span className="quantity">{quantity}</span>
                    <button onClick={subtractQuantity} className="dec">-</button>
                </div>
                <button onClick={removeFromCart}>Remove From Cart</button>
            </div>
           
        </div>

    )
}

export default CheckoutCart
