import React from 'react';
import { useCart } from './CartContext';
import './Subtotal.css';

function Subtotal() {
    const[{cart}]=useCart();
    let quantArr=cart.map(item=>item.quantity)
    const reducer=(accumulator,currentValue)=>accumulator+currentValue;
    let subTotalItems=quantArr.reduce(reducer)
    let subTotalPriceArr=cart.map(item=>item.quantity*item.price)
    let price=subTotalPriceArr.reduce(reducer)
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
