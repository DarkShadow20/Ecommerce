import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext';
import reducer,{ initialState } from './context/reducer';
export {default as Wish} from "./Wishlist/Wish";
export {default as CheckoutCart} from "./cart/CheckoutCart";
export {default as ShoppingBasketIcon} from "@material-ui/icons/ShoppingBasket";
export {default as ProductList} from "./ProductList/ProductList"

ReactDOM.render(
  <React.StrictMode>
    <CartProvider initialState={initialState} reducer={reducer}>
      <App />
      </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
