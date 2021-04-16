import React from 'react'
import "../css/WishList.css";
import { useCart } from '../context/CartContext'


function Wish({items}) {
    //eslint-disable-next-line
    const [wishlist,dispatch]=useCart();
    const addToBasket=()=>{
        dispatch({
            type:'MOVE_TO_CART',
            payload:items.id
        })
    };
    return (
        <div class="card" >
        <div class="img-header">
            <img class="card-img-top" src={items.image} alt="Card img cap" style={!items.inStock?{opacity:0.1}:{opacity:1}}/>
            <button class="card-close close" data-dismiss="modal" aria-label="Close"  onClick={()=>{dispatch({
            type:'REMOVE_FROM_WISHLIST',
            id:items.id
        })}}><span aria-hidden="true">&times;</span></button> 
        </div>
        {!items.inStock && <span className="out-of-stock-overlay">Out of Stock</span>}
        <div class="card-body">
            <h5 class="card-title">{items.name}</h5>
            <p class="card-text">
                <div className="checkoutCart_rating">
                    {
                        Array(items.rating).fill().map((_)=>(
                            <p>⭐</p>
                        ))
                    }
                </div>
            <span>
                <span class="strong-element">Rs.{items.price}</span>
            </span>
            </p>
            <button onClick={addToBasket} class="btn btn-primary" disabled={!items.inStock} style={!items.inStock?{opacity:0.2}:{opacity:1}}>Add to Cart</button>   
        </div>
        </div>
    )
}

export default Wish


