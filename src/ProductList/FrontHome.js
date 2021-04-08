import React from 'react'
import {Link} from 'react-router-dom';
import "../css/FrontHome.css";
import logo from "../images/logo.png";
function FrontHome() {
    return (
        <div>
            <img src={logo} alt="icon" className="home-icon"/>
            <Link to="/home" className="btn-link"><button className="link">Shop Now</button></Link>
        </div>
    )
}

export default FrontHome
