import "./App.css";
import { Routes,Route} from "react-router-dom";
import Header from "./ProductList/Header";
import Home from "./ProductList/Home";
import Cart from "./cart/Cart";
import WishList from "./Wishlist/WishList";
import FrontHome from "./ProductList/FrontHome";

function App() {
  return (
      <div className="App">
      <Header/>
        <Routes>
          <Route path="/wishlist" element={<WishList/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/" element={<FrontHome/>}/>
        </Routes>
      </div>
  );
}

export default App;
