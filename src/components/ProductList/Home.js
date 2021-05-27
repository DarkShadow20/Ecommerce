import React from 'react'
import {ProductList} from '../../components';
import "../../css/Home.css";
import { useCart } from '../../context/CartContext'

export const categories = [
  "Racquet",
  "Shuttle",
  "String"
];
export const featuredCategories=[
  {name:"Racquet",img:"https://www.yonex.com/media/catalog/category/Badminton-Racquets-Desktop.jpg"},
  {name:"Shuttle",img:"https://www.yonex.com/media/catalog/category/Badminton-Shuttles-Desktop.jpg"},
  {name:"String",img:"https://www.yonex.com/media/catalog/category/Badminton-Strings-Desktop.jpg"}
]

function Home() {
  const [state,dispatch]=useCart();
  const products = state.products[0]  
  const getSortedData = (products, sortBy) => {
    if (sortBy === "LOW_TO_HIGH")
    {
      return products.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "HIGH_TO_LOW")
    {
      return products.sort((a, b) => b.price - a.price);
    }
    return products;
  };
  const getFilteredData = (products, onlyFastDelivery,includeOutOfStock,filterByCategories) => {
    let newData=[...products];
    if(filterByCategories.length!==0){
      newData=newData.filter((product)=>state.filterByCategories.includes(product.category))
      console.log(newData)
    }
    return newData
      .filter((item) => (onlyFastDelivery ? item.fastDelivery : true))
      .filter((item) => (includeOutOfStock ? true : item.inStock))
  };
  const sortedData = getSortedData(products, state.sortBy);
  const filteredData = getFilteredData(
    sortedData,
    state.onlyFastDelivery,
    state.includeOutOfStock,
    state.filterByCategories
  );
    return (
        <div className="main-container">
          <div className="filter-container">
            <span className="sort-price">Sort by price</span>
            <p className="input-radio-low-to-high"><input  type="radio" name="price" onClick={() => dispatch({ type: "LOW_TO_HIGH" })} checked={state.sortBy && state.sortBy==="LOW_TO_HIGH"}/>low to high</p>
            <p className="input-radio-high-to-low"><input type="radio" name="price" onClick={() => dispatch({ type: "HIGH_TO_LOW" })} checked={state.sortBy && state.sortBy==="HIGH_TO_LOW"}/>high to low</p>
          <span className="prefer">Preferences</span>
          <span className="input-fields">
            <input
              type="checkbox"
              onClick={() => dispatch({ type: "OUT_OF_STOCK" })} checked={state.includeOutOfStock}
            />
            include out of stock products
          </span>
          <span className="input-fields">
            <input
              type="checkbox"
              onClick={() => dispatch({ type: "WITH_FAST_DELIVERY" })} checked={state.onlyFastDelivery}
            />
            fast delivery only
          </span>
          <span className="prefer">Categories</span>
          {categories.map((category) => {
          return (
              <span className="input-fields">
                <input
                  type="checkbox"
                  checked={state.filterByCategories.includes(
                    category
                  )}
                  onChange={() => {
                    dispatch({
                      type: "FILTER_BY_CATEGORIES",
                      payload: category
                    });
                  }}
                />
                {category}
              </span>
          );
        })}
          <button className="remove-filters" onClick={() => dispatch({type:"RESET_FILTERS"})}>
            Remove Filters
          </button>
          </div>
            <div className="card-collection-wrapper">
                {filteredData.map((items)=>(
                    <ProductList id={items.id}
                    name={items.name}
                    price={items.price}
                    image={items.image}
                    quantity={items.quantity}
                    rating={items.rating}
                    inStock={items.inStock}
                    fastDelivery={items.fastDelivery}
                    category={items.category}
                    />
                ))}
              </div>  
            
        </div>
    )
}

export default Home
