import React from 'react'
import "./Header.css";
import {Link} from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useCart } from './CartContext';

function Header() {
    const [{cart}]=useCart();
    console.log(cart)
    return (
        <nav className="header">
            <Link to="/" style={{textDecoration:"none"}}>
                <h1 className="header__logo">Nile</h1>
            </Link>
            <div className="header__nav">
                <Link to="/" className="header__link">
                    <div className="header__option">
                        <span className="option">All Products</span>
                    </div>
                </Link>

                <Link to="/wishlist" className="header__link">
                    <div className="header__option">
                        <span className="option">WishList</span>
                    </div>
                </Link>

                <Link to="/cart"className="header__link">
                    <div className="header__optionbasket">
                        <ShoppingBasketIcon/>
                        <span className="option header__BasketCount">{cart?.length}</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Header
