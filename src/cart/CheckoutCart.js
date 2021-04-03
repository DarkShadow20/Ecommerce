import React from 'react'
import {useCart} from "../context/CartContext";
import "../css/CheckoutCart.css";

function CheckoutCart({id,title,price,image,quantity,rating}) {
    const [{state},dispatch]=useCart();
    console.log({state})
    const removeFromCart=()=>{
        dispatch({
            type:'REMOVE_FROM_CART',
            id:id
        })
    }
    const addQuantity=()=>{
        dispatch({
            type:'ADD_QUANTITY',
            id:id
        })
    }
    const subtractQuantity = () => {
        dispatch( {
          type: 'SUB_QUANTITY',
          id:id,
        })
      };
    return (
        <div class="card" >
                <div class="img-header">
                    <img class="card-img-top" src={image} alt="Card img cap"/> 
                </div>
            <div class="card-body" >
                <h5 class="card-title">{title}</h5>
                    <p class="card-text">
                        <div className="product__rating">
                        {
                            Array(rating).fill().map((_)=>(
                                <p>⭐</p>
                            ))
                        }
                        </div>
                    </p>
                <span>
                    <span class="strong-element">Rs.{price}</span>
                </span>
                <div className="checkoutCart_quantity">
                    <button className="btn btn-primary" onClick={addQuantity} >+</button>
                     <span className="quantity">{quantity}</span>
                     <button className="btn btn-primary" onClick={subtractQuantity} >-</button>
                 </div>
                 <button className="btn btn-primary" onClick={removeFromCart}>Remove From Cart</button>
             </div>
        </div>
    )
}

export default CheckoutCart
