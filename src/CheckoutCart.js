import React from 'react'
import {useCart} from "./CartContext.js";
import "./CheckoutCart.css";

function CheckoutCart({id,title,price,image,quantity,rating}) {
    const [{h},dispatch]=useCart();
    console.log({h})
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
        // <div className="checkoutCart" key="id">
        //     <img className="checkoutCart_image" src={image} alt=""/>
        //     <div className="checkoutCart_info">
        //         <p className="checkoutCart_title">{title}</p>

        //         <p className="checkoutCart_price">
        //             <small>Rs.</small>
        //             <strong>{price}</strong>
        //         </p>
        //         <div className="checkoutCart_rating">
        //             {Array(rating).fill().map((_)=>(
        //                 <p >⭐</p>
        //             ))}
        //         </div>
        //         <div className="checkoutCart_quantity">
        //             <button onClick={addQuantity} >+</button>
        //             <span className="quantity">{quantity}</span>
        //             <button onClick={subtractQuantity} className="dec">-</button>
        //         </div>
        //         <button onClick={removeFromCart}>Remove From Cart</button>
        //     </div>
           
        // </div>

    )
}

export default CheckoutCart
