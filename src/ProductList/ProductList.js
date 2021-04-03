import React from 'react'
import { useCart } from '../context/CartContext';
import "../css/ProductList.css";

function ProductList({id,name,price,image,quantity,rating,inStock,fastDelivery}) {
    const [state,dispatch]=useCart();
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
    const removefromWishList=()=>{
        dispatch({
            type:'TOGGLE_REMOVE_FROM_WISHLIST',
            id:id
        })
    }
    return (
        <>
        <div class="card-collection-wrapper">
	        <div class="card" >
                <div class="img-header">
                    <img class="card-img-top" src={image} alt="Card img cap"/> 
                </div>
            <div class="card-body" >
                <h5 class="card-title">{name}</h5>
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
                <button className="btn btn-primary" onClick={addToBasket} disabled={!inStock}>Add to Cart</button> 
            {state.wishlist.find((items)=>items.id===id)?(<button className="btn btn-primary" onClick={removefromWishList}>Remove from Wishlist</button>):(<button className="btn btn-primary" onClick={addToWishlist}>Add to Wishlist</button>)}
            </div>
            </div>
        </div>

        </>
    )
}

export default ProductList
