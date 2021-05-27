import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import reducer,{ initialState } from './context/reducer';
import {BrowserRouter as Router } from "react-router-dom";

export {default as Wish} from "./Wishlist/Wish";
export {default as CheckoutCart} from "./cart/CheckoutCart";
export {default as ShoppingBasketIcon} from "@material-ui/icons/ShoppingBasket";
export {default as ProductList} from "./ProductList/ProductList"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider initialState={initialState} reducer={reducer}>
        <App />
        </CartProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


