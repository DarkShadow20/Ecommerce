import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import "../../css/FrontHome.css";
import { featuredCategories } from "../ProductList/Home";
import Loader from "react-loader-spinner";

function FrontHome() {
  //eslint-disable-next-line
  const [state, dispatch] = useCart();
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://Ecom.kunalgupta9.repl.co/products"
        );
        dispatch({ type: "GET_PRODUCT", payload: response.data.products });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrMsg("Failed to load data");
        console.log(errMsg);
      }
    })();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
          <div className="loader">
            <Loader type="ThreeDots" color="#fc452e" height={80} width={80} />
        </div>
      ) : (
        <>
          <div>
            <img
              src="https://www.yonex.com/media/scandiweb/slider/2/8/2880x1800_homepage_06vcore_20210223_.jpg"
              alt="icon"
              className="home-icon"
            />
            <Link to="/products" className="btn-link">
              <button
                className="link"
                onClick={() => {
                  dispatch({
                    type: "SHOW_ALL",
                  });
                }}
              >
                Shop Now
              </button>
            </Link>
          </div>
          <div className="categories">
            <section className="title">
              <p>Categories</p>
            </section>
            <section className="image-category">
              {featuredCategories.map((category) => {
                return (
                  <>
                    <Link to="/products">
                      <img
                        src={category.img}
                        className="category-img"
                        alt=""
                        onClick={() => {
                          dispatch({
                            type: "FILTER_BY_CATEGORIES",
                            payload: category.name,
                          });
                        }}
                      />
                      <span className={`overlay overlay-${category.name}`}>
                        {category.name}
                      </span>
                    </Link>
                  </>
                );
              })}
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default FrontHome;
