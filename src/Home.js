import React from 'react'
import ProductList from './ProductList'
import "./Home.css";
import faker from "faker";
import { useCart } from './CartContext';

faker.seed(123);
export const products = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  quantity:faker.random.number({
    'min': 1,
    'max': 1
}),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));

function Home() {
  const [state,dispatch]=useCart();
  const getProductsUnderPrice = (products, priceRange) => {
    if (priceRange) return products.filter((item) => item.price <= priceRange);
    return products;
  };

  const getSortedData = (products, sortBy) => {
    if (sortBy === "LOW_TO_HIGH")
      return products.sort((a, b) => a.price - b.price);
    if (sortBy === "HIGH_TO_LOW")
      return products.sort((a, b) => b.price - a.price);
    return products;
  };

  const getFilteredData = (products, onlyFastDelivery, includeOutOfStock) => {
    return products
      .filter((item) => (onlyFastDelivery ? item.fastDelivery : true))
      .filter((item) => (includeOutOfStock ? true : item.inStock));
  };

  const priceRangeData = getProductsUnderPrice(products, state.priceRange);

  const sortedData = getSortedData(priceRangeData, state.sortBy);

  const filteredData = getFilteredData(
    sortedData,
    state.onlyFastDelivery,
    state.includeOutOfStock
  );
    return (
        <div className="home">
          <fieldset style={{ width: "100%", borderRadius: "1rem" }}>
          <legend>Sort by price</legend>
          <label>
            <input
              type="radio"
              name="price"
              onClick={() => dispatch({ type: "LOW_TO_HIGH" })}
            />
            low to high
          </label>
          <label>
            <input
              type="radio"
              name="price"
              onClick={() => dispatch({ type: "HIGH_TO_LOW" })}
            />
            high to low
          </label>
        </fieldset>
        <fieldset style={{ width: "100%", borderRadius: "1rem" }}>
          <legend>Preferences</legend>
          <label>
            <input
              type="checkbox"
              onClick={() => dispatch({ type: "OUT_OF_STOCK" })}
            />
            include out of stock products
          </label>
          <label>
            <input
              type="checkbox"
              onClick={() => dispatch({ type: "WITH_FAST_DELIVERY" })}
            />
            fast delivery only
          </label>
        </fieldset>
            <div className="home__row">
                {filteredData.map((items)=>(
                    <ProductList id={items.id}
                    name={items.name}
                    price={items.price}
                    image={items.image}
                    quantity={items.quantity}
                    rating={items.ratings}
                    inStock={items.inStock}
                    fastDelivery={items.fastDelivery}
                    />
                ))}
                
            </div>
        </div>
    )
}

export default Home
