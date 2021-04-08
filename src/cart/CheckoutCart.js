import React from 'react'
import { useCart } from '../context/CartContext'
import "../css/CheckoutCart.css";

function CheckoutCart({item}) {
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    
    const removeFromCart=()=>{
        dispatch({
            type:'REMOVE_FROM_CART',
            id:item.id
        })
    }
    const addQuantity=()=>{
        dispatch({
            type:'ADD_QUANTITY',
            id:item.id
        })
    }
    const subtractQuantity = () => {
        dispatch( {
          type: 'SUB_QUANTITY',
          id:item.id,
        })
      };
    return (
            <div className="cards">
                <div className="img-header">
                    <img className="card-img-top" src={item.image} alt="Card img cap"/> 
                </div>
            <div className="card-body" >
                <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                        <div className="product__rating">
                        {
                            Array(item.rating).fill().map((_)=>(
                                <p>⭐</p>
                            ))
                        }
                        </div>
                    </p>
                <span>
                    <span class="strong-element">Rs.{item.price}</span>
                </span>
                <div className="checkoutCart-quantity">
                    <button className="btn btn-primary" onClick={addQuantity} >+</button>
                     <span className="quantity">{item.quantity}</span>
                     <button className="btn btn-primary" onClick={subtractQuantity} >-</button>
                 </div>
                 <button className="btn btn-primary" onClick={removeFromCart}>Remove From Cart</button>
             </div>
        </div>
    )
}

export default CheckoutCart
