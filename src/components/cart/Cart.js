import React,{useEffect} from 'react'
import { useCart } from '../../context/CartContext'
import {CheckoutCart} from "..";
import "../../css/Cart.css";
import Subtotal from "../cart/Subtotal";
import { useAuth } from '../../context/AuthContext';
import axios from "axios";

function Cart() {
    const [{cart}]=useCart();
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    const {userData}=useAuth();
    useEffect(()=>{
        (async function(){
            try{
                const response=await axios.get(`https://Ecom.kunalgupta9.repl.co/cart/${userData?._id}`)
                console.log(response.data.cart)
                dispatch({
                    type: "GET_CART_ITEMS",
                    payload: response.data.cart
                  });
            }
            catch(err){
                console.log(err)
            }
        })()
        //eslint-disable-next-line
    },[])
    console.log(cart)
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
                    {cart?.map(item=>(
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
