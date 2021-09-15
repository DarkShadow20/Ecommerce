import React from 'react';
import ReactDOM from "react-dom"
import { useCart } from '../../context/CartContext';
import '../../css/Subtotal.css';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function Subtotal({setIsOrderPlaced}) {
    const[{cart}]=useCart();
    const {userData}=useAuth();
    // eslint-disable-next-line
    const [state,dispatch]=useCart();
    let quantityArr=cart.map(item=>item.quantity)
    const reducer=(accumulator,currentValue)=>accumulator+currentValue;
    let subTotalItems=quantityArr.reduce(reducer)
    let subTotalPriceArr=cart.map(item=>item.quantity*item.price)
    let price=subTotalPriceArr.reduce(reducer,0)

    function createOrderOnBtnClick(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: (price * 0.01368).toFixed(2),
              },
            },
          ],
        });
      }
      async function paymentSuccess(data, actions) {
        await actions.order.capture();
        setIsOrderPlaced(true)
        try{
            const response=await axios.delete(`https://4476efe4-fb5e-4281-8701-eb43a60b186d.id.repl.co/cart/${userData?._id}`)
            if(response.status===201){
                dispatch({
                    type:'GET_CART_ITEMS',
                    payload:[]
                })

            }
        }catch(error){
            console.log(error)
        }
      }
      function paymentFailure(data) {
        console.log("payment failed!", { data });
      }
    return (
        <div className="subtotal">
            <p>
                Subtotal ({subTotalItems} items):<strong>Rs.{price}</strong>
            </p>
      <PayPalButton
        style={{ layout: "horizontal", color: "silver", tagline: false }}
        createOrder={createOrderOnBtnClick}
        onApprove={paymentSuccess}
        onError={paymentFailure}
      />
        </div>
    )
}

export default Subtotal
