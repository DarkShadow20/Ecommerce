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
        <Switch>
          <Route exact path="/wishlist">
            <Header/>
            <WishList/>
          </Route>
          <Route exact path="/cart">
            <Header/>
            <Cart/>
          </Route>
          <Route exact path="/home">
            <Header/>
            <Home/>
          </Route>
          <Route exact path="/">
            <Header/>
            <FrontHome/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
