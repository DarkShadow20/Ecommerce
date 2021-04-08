import "./App.css";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Header from "./ProductList/Header";
import Home from "./ProductList/Home";
import Cart from "./cart/Cart";
import WishList from "./Wishlist/WishList";
import FrontHome from "./ProductList/FrontHome";

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
        <Switch>
          <Route exact path="/wishlist">
            <WishList/>
          </Route>
          <Route exact path="/cart">
            <Cart/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/">
            <FrontHome/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
