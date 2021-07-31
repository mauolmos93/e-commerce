import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showProduct, selectProduct, selectProductsByCategory } from "../redux/products";
import { Link, useHistory } from "react-router-dom";
import Card from "./Card";
import "../assets/styles/components/Carousel.scss";
import { setProductsAddedToCart } from "../redux/productsAdded";
import { showCategories } from "../redux/categories";

const Carousel = () => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.productsAddedToCart);
  const categories = useSelector(state => state.categories)
  useEffect(() => {
    dispatch(showProduct());
    dispatch(showCategories())
  }, []);

  function addProduct (product) {
    const alreadyInCart = productsInCart.map(productInCart => productInCart.id == product.id)
    // alreadyInCart -> [false, false, false, true, false]
    if (alreadyInCart.includes(true)) {
      const i = alreadyInCart.indexOf(true)
      const productsInCartCopy = []
      productsInCart.forEach(product => {
        productsInCartCopy.push({...product})
      });
      // const productsInCartCopy = [...productsInCart] si lo hago de esta forma los objetos de adentro del arreglo son inmutables, tengo que de alguna forma recrear tambien los objetos de adentro, no solo el arreglo...
      /* console.log(productsInCartCopy)
      console.log("i ->", i)
      console.log("quantity already in cart ->", productsInCartCopy[i].quantity) */
      productsInCartCopy[i].quantity++
      dispatch(setProductsAddedToCart(productsInCartCopy))   
    } else {
      const productCopy = {...product, quantity: 1}
      dispatch(setProductsAddedToCart([...productsInCart, productCopy]))   
    }
  }

  function handleClick (e) {
    const category = e.target.textContent
    dispatch(selectProductsByCategory(category))
  }

  return (
    <>
      <div className="categories">
        {categories.map(category => <button key={category} onClick={handleClick}>{category}</button>)}
      </div>
      <div className="wrapper">
        <div className="even-columns">
          {products.map((product) => (
            <div key={product.id}>
              {/* <Link
                onClick={() => dispatch(selectProduct(product.id))}
                to={`/products/${product.id}`}
              > */}
                <div className="col">
                  <Card product={product} />
                </div>
              {/* </Link> */}
              <div className="btn-group">
                <button
                  onClick={() => addProduct(product)}
                >
                  Add to cart
                </button>
                <Link
                  onClick={() => dispatch(selectProduct(product.id))}
                  to={`/products/${product.id}`}
                  key={product.id}
                >
                  <button>View Product</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
