import React from 'react'
import { useCart } from '../context/CartContext'
import "../css/ProductList.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            payload:{
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
    const notifyForCart=()=>{toast.success("Added To Cart",{position:toast.POSITION.BOTTOM_RIGHT})}
    const notifyForWishlist=()=>{toast.success("Added to Wishlist",{position:toast.POSITION.BOTTOM_RIGHT})}
    const notifyForRemovalWishlist=()=>{toast.info("Removed from wishlist",{position:toast.POSITION.BOTTOM_RIGHT})}
    const removefromWishList=()=>{
        dispatch({
            type:'TOGGLE_REMOVE_FROM_WISHLIST',
            payload:id
        })
    }
    return (
        <>
        <div class="card-collection-wrapper">
	        <div class="card" >
                <div class="img-header">
                    <img class="card-img-top" src={image} alt="Card img cap" style={!inStock?{opacity:0.1}:{opacity:1}}/> 
                </div>
                {!inStock && <span className="out-of-stock-overlay">Out of Stock</span>}
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
                <div className="btn-toast">
                    <button className="btn btn-primary" onClick={()=>{
                        addToBasket();
                        notifyForCart();}} disabled={!inStock} style={!inStock?{opacity:0.1}:{opacity:1}}>Add to Cart</button> 
                    <ToastContainer/>
                </div>
            {state.wishlist.find((items)=>items.id===id)?(<button className="btn btn-primary" onClick={()=>{removefromWishList();notifyForRemovalWishlist()}}>Remove from Wishlist</button>):(<button className="btn btn-primary" onClick={()=>{addToWishlist();notifyForWishlist();}}>Add to Wishlist</button>)}
            </div>
            </div>
        </div>

        </>
    )
}

export default ProductList
