import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import axios from "axios";
import { useCart } from '../../context/CartContext';
import "../../css/FrontHome.css";
import {featuredCategories} from "../ProductList/Home";

function FrontHome() {
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    const [errMsg,setErrMsg]=useState();

    useEffect(()=>{
    (async function (){
      try{
        const response=await axios.get("https://Ecommerce.kunalgupta9.repl.co/products");
        dispatch({type:"GET_PRODUCT", payload:response.data})
      }catch(err){
        setErrMsg("Failed to load data");
        console.log(errMsg);
      }
    })();
    (async function () {
        try {
          const response = await axios.get(
            "https://Ecommerce.kunalgupta9.repl.co/wishlist"
          );
          dispatch({
            type: "GET_WISHLIST_ITEMS",
            payload: response.data 
          });
        } catch (err) {
          console.log(err);
        }
      })();
    (async function () {
        try {
          const response = await axios.get(
            "https://Ecommerce.kunalgupta9.repl.co/cart"
          );
          dispatch({
            type: "GET_CART_ITEMS",
            payload: response.data
          });
        } catch (err) {
          console.log(err);
        }
      })();
      //eslint-disable-next-line
  },[])
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
