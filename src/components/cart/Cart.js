import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { CheckoutCart } from "..";
import "../../css/Cart.css";
import Subtotal from "../cart/Subtotal";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Loader from "react-loader-spinner";
import { OrderConfirmation } from "./OrderConfirmation";
function Cart() {
  const [{ cart }] = useCart();
  //eslint-disable-next-line
  const [state, dispatch] = useCart();
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://4476efe4-fb5e-4281-8701-eb43a60b186d.id.repl.co/cart/${userData?._id}`
        );
        dispatch({
          type: "GET_CART_ITEMS",
          payload: response.data.cart,
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
    //eslint-disable-next-line
  }, []);
  console.log(isOrderPlaced);
  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader type="ThreeDots" color="#fc452e" height={80} width={80} />
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-container-left">
            {isOrderPlaced ? (
              <OrderConfirmation />
            ) : (
              <>
                {cart?.length === 0 ? (
                  <div>
                    <h2>Your Shopping cart is empty</h2>
                    <p>
                      You have no items in your cart.To buy one or more items,
                      click "Add to Cart" next to item.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2>Your Shopping Cart</h2>
                    <div className="card-collection-wrappers">
                      {cart?.map((item) => (
                        <CheckoutCart item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {cart.length > 0 && (
            <div className="cart-container-right">
              <Subtotal setIsOrderPlaced={setIsOrderPlaced} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
