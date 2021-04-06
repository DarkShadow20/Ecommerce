import React from 'react'
import {Link} from 'react-router-dom';
import "../css/FrontHome.css"
function FrontHome() {
    return (
        <div>
            <img src="https://i.dlpng.com/static/png/6734889_preview.png" alt="amazon-icon" className="home-icon"/>
            <button className="btn btn-primary link"><Link to="/home" className="btn-link">Shop Now</Link></button>
        </div>
    )
}

export default FrontHome
