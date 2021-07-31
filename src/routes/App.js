import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Carousel from "../components/Carousel";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import Register from "../components/Register";
import LogIn from "../components/LogIn";
import Layout from "../components/Layout";
import SingleCard from "../components/SingleCard";
import "../assets/styles/App.scss";
import Card from "../components/Card";
import ShoppingCart from "../components/ShopingCart"
import Checkout from "../components/Checkout"
import User from "../components/User"
import Users from "../components/Users";
import Products from "../components/Products"
import EditProduct from "../components/EditProduct"
import CreateProduct from "../components/CreateProduct"
import Orders from "../components/Orders"




const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/products" component={Carousel} />
          <Route path="/products/:productId" component={SingleCard}/>
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/user" component={User} />
          <Route exact path="/userslist" component={Users} />
          <Route exact path="/productslist" component={Products} />
          <Route exact path="/editproduct/:id" component={EditProduct} />
          <Route exact path="/createproduct/" component={CreateProduct} />
          <Route exact path="/orders/:id" component={Orders} />
          <Redirect to={"/products"} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
