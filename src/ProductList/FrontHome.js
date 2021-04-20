import React from 'react'
import {Link} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import "../css/FrontHome.css";
import {featuredCategories} from "../ProductList/Home";

function FrontHome() {
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    return (
        <>
        <div>
            <img src="https://www.yonex.com/media/scandiweb/slider/2/8/2880x1800_homepage_06vcore_20210223_.jpg" alt="icon" className="home-icon"/>
            <Link to="/home" className="btn-link"><button className="link" onClick={()=>{dispatch({
                type:"SHOW_ALL",
            })}}>Shop Now</button></Link>
        </div>
        <div className="categories">
            <section className="title">
                <p>Categories</p>
            </section>
            <section className="image-category">
                {featuredCategories.map((category)=>{
                    return(
                        <>
                       <Link to="/home"><img src={category.img} className="category-img"  alt="" onClick={()=>{
                            dispatch({
                                type:"FILTER_BY_CATEGORIES",
                                payload:category.name
                            })
                            ;
                        }}/>
                        <span className={`overlay overlay-${category.name}`}>{category.name}</span>
                        </Link>
                        </>
                    )
                })}
            </section>
        </div>
        </>
    )
}

export default FrontHome
