import "./App.css";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Header from "./ProductList/Header";
import Home from "./ProductList/Home";
import Cart from "./cart/Cart";
import WishList from "./Wishlist/WishList";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/wishlist">
            <Header/>
            <WishList/>
          </Route>
          <Route path="/cart">
            <Header/>
            <Cart/>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
