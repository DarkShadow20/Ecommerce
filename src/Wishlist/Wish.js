import React from 'react'
import "../css/WishList.css";
import {useCart} from "../context/CartContext";

function Wish({id,name,price,image,quantity,rating,inStock}) {
    const [wishlist,dispatch]=useCart();
    console.log(wishlist)
    const addToBasket=()=>{
        dispatch({
            type:'MOVE_TO_CART',
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
        <div class="card" >
        <div class="img-header">
            <img class="card-img-top" src={image} alt="Card img cap"/>
            <button class="card-close close" data-dismiss="modal" aria-label="Close"  onClick={()=>{dispatch({
            type:'REMOVE_FROM_WISHLIST',
            id:id
        })}}><span aria-hidden="true">&times;</span></button> 
        </div>
        <div class="card-body">
            <h5 class="card-title">{name}</h5>
            <p class="card-text">
                <div className="checkoutCart_rating">
                    {
                        Array(rating).fill().map((_)=>(
                            <p>⭐</p>
                        ))
                    }
                </div>
            <span>
                <span class="strong-element">Rs.{price}</span>
            </span>
            </p>
            <button onClick={addToBasket} class="btn btn-primary" disabled={!inStock}>Add to Cart</button>
        </div>
        </div>
    )
}

export default Wish


