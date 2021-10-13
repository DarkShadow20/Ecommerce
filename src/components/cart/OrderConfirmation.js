import { Link } from "react-router-dom";
import "../../css/CheckoutCart.css";

export function OrderConfirmation() {
  return (
    <>
      <div className="order-confirmation-wrapper">
        <h1 >Order Confirmed</h1>
        <p style={{margin:"1rem 0 0 4rem"}}>Thank you for shopping with us!</p>
        <Link to="/products" >
         <button className="btn btn-primary " style={{margin:"2rem 0 0 6rem"}}>Shop Again</button>
        </Link>
      </div>
    </>
  );
}