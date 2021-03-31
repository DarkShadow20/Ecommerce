import React from 'react'
import { useCart } from './CartContext'
import "./CheckoutCart.css";
import "./WishList.css";
import Wish from "./Wish.js";

function WishList() {
    const [{wishlist}]=useCart();
    return(
        <div>
            {wishlist?.length===0?(
                <div>
                    <h2>Your WishList is empty</h2>
                    <p>You have no items in your Wishlist.</p>
                </div>

            ):(
                <div>
                    <h2>Your WishList</h2>
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
            )}
            
        </div>
    )
}

export default WishList


        
