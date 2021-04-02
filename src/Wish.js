import React from 'react'
import "./WishList.css";
import {useCart} from "./CartContext";

function Wish({id,name,price,image,quantity,rating,inStock}) {
    const [{wis},dispatch]=useCart();
    console.log(wis)
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
    const removeFromWishList=()=>{
        dispatch({
            type:'REMOVE_FROM_WISHLIST',
            id:id
        })
    }
    return (
        <div class="card" >
        <div class="img-header">
            <img class="card-img-top" src={image} alt="Card img cap"/>
            <button class="card-close close" data-dismiss="modal" aria-label="Close" onClick={removeFromWishList}><span aria-hidden="true">&times;</span></button> 
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
            <button onClick={addToBasket} class="btn btn-primary">Add to Cart</button>
        </div>
        </div>
        // <div className="wishlist">
        //         <div className="wishlist_wrapper">
        //             <img className="checkoutCart_image" src={image} alt=""/>
        //             <div className="wishlist_info">
        //                 <p className="checkoutCart_title">{name}</p>

        //                 <p className="checkoutCart_price">
        //                     <small>Rs.</small>
        //                     <strong>{price}</strong>
        //                 </p>
        //                 <div className="checkoutCart_rating">
        //                 {
        //                 Array(rating).fill().map((_)=>(
        //                     <p>⭐</p>
        //                 ))
        //             }
        //                 </div>
        //         <button className="btn-cart" onClick={addToBasket} disabled={!inStock}>Add to Cart</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Wish


