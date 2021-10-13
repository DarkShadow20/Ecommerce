import React from 'react'
import "../../css/Header.css";
import {Link} from "react-router-dom";
import {ShoppingBasketIcon} from "..";
import { useCart } from '../../context/CartContext'
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router';

function Header() {
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    const [{cart}]=useCart();

    const {isUserLoggedIn,setLogin}=useAuth();
    const navigate=useNavigate();
    return (
        <nav className="header">
            <Link to="/" style={{textDecoration:"none"}}>
                <h2 className="header__logo">Nile</h2>
            </Link>
            <div className="header__nav">
                <Link to="/products" className="header__link">
                <div className="header__option">
                        <span className="option">Products</span>
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
                    <div className="header__option">
                    {isUserLoggedIn ? (
                                  <>
                                    <button
                                      onClick={() => {
                                        navigate("/")
                                        setLogin(false);
                                        dispatch({type:"LOGOUT",payload:"logout"})
                                      }}
                                    >
                                      <div>Log out</div>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        navigate("/login");
                                      }}
                                    >
                                      <div>Login</div>
                                    </button>
                                    <button
                                      onClick={() => {
                                        navigate("/signup");
                                      }}
                                    >
                                      <span>Sign up</span>
                                    </button>
                                  </>
                                )}
                    </div>
            </div>
        </nav>
    )
}

export default Header
