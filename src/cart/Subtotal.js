import React from 'react';
import { useCart } from '../context/CartContext';
import '../css/Subtotal.css';

function Subtotal() {
    const[{cart}]=useCart();
    let quantityArr=cart.map(item=>item.quantity)
    const reducer=(accumulator,currentValue)=>accumulator+currentValue;
    let subTotalItems=quantityArr.reduce(reducer)
    let subTotalPriceArr=cart.map(item=>item.quantity*item.price)
    let price=subTotalPriceArr.reduce(reducer,0)
    return (
        <div className="subtotal">
            <p>
                Subtotal ({subTotalItems} items):<strong>Rs.{price}</strong>
            </p>
            <button className="btn btn-primary">Buy Now</button>
        </div>
    )
}

export default Subtotal
