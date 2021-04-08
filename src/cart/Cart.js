import React from 'react'
import { useCart } from '../context/CartContext'
import {CheckoutCart} from "..";
import "../css/Cart.css";
import Subtotal from "../cart/Subtotal";

function Cart() {
    const [{cart}]=useCart();
    return (
        <div className="cart-container">
            <div className="cart-container-left">
            {cart?.length === 0 ?(
                <div>
                    <h2>Your Shopping cart is empty</h2>
                    <p>You have no items in your cart.To buy one or more items, click "Add to Cart" next to item.</p>
                </div>
            ):(
                <div>
                    <h2>Your Shopping Cart</h2>
                    <div className="card-collection-wrappers">
                    {cart.map(item=>(
                        <CheckoutCart 
                        item={item}
                        />
                    ))}
                    </div>
                </div>
            )}
            </div>
            {cart.length>0 &&(
                <div className="cart-container-right">
                    <Subtotal/> 
                </div>
            )}
        </div>
    )
}

export default Cart
