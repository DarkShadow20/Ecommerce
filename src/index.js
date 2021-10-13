import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import reducer,{ initialState } from './context/cart-reducer';
import {BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider initialState={initialState} reducer={reducer}>
          <App />
        </CartProvider>
      </AuthProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


