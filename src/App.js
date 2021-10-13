import "./App.css";
import { Routes,Route} from "react-router-dom";
import {Header,Home,WishList,Cart, PrivateRoute} from "./components";
import FrontHome from "./components/ProductList/FrontHome";
import { Login, SignUp } from "./components";

function App() {
  return (
      <div className="App">
      <Header/>
        <Routes>
          <PrivateRoute path="/wishlist" element={<WishList/>}/>
          <PrivateRoute path="/cart" element={<Cart/>}/>
          <Route path="/products" element={<Home/>}/>
          <Route path="/" element={<FrontHome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </div>
  );
}

export default App;
