import React from 'react'
import { useCart } from '../context/CartContext'
import "../css/CheckoutCart.css";
import "../css/WishList.css";
import Wish from "./Wish.js";

function WishList() {
    const [{wishlist}]=useCart();
    return(
        <div>
            {wishlist?.length===0?(
                <div>
                    <h2>Your WishList is empty</h2>
                    <p className="wish-empty-text">You have no items in your Wishlist.</p>
                </div>

            ):(
                <>
                    <h2>Your WishList</h2>
                    <div className="card-collection-wrapper">
                    {wishlist.map((items)=>(
                    <Wish id={items.id}
                    name={items.name}
                    price={items.price}
                    image={items.image}
                    quantity={items.quantity}
                    rating={items.rating}
                    inStock={items.inStock}
                    fastDelivery={items.fastDelivery}/>
                    ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default WishList


        
