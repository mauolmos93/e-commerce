import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { productsAddedToCartFromDb, setProductsAddedToCart } from "../redux/productsAdded";
import { setOrder } from "../redux/order";
import axios from 'axios'

export default function ShoppingCart() {
  const productsInCart = useSelector((state) => state.productsAddedToCart);
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const dispatch = useDispatch();

  useEffect(() => {
    if(!productsInCart.length && user.id)
      dispatch(productsAddedToCartFromDb(user.id))
  }, [user])

  const total = function total() {
    let totalPrice = 0;
    productsInCart.map((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  }

  function decrease (product) {
    const productsInCartCopy = []
    productsInCart.forEach(product => {
      productsInCartCopy.push({...product})
    });
    productsInCartCopy.forEach(copyProduct => {
      if (copyProduct.id == product.id) {
        if(copyProduct.quantity === 1)
          handleRemoveCartItem(copyProduct.id)
        if (copyProduct.quantity > 1) {
          copyProduct.quantity -= 1
          dispatch(setProductsAddedToCart(productsInCartCopy))
        }
      }
    })
  }

  function increase (product) {
    const productsInCartCopy = []
    productsInCart.forEach(product => {
      productsInCartCopy.push({...product})
    });
    productsInCartCopy.forEach(copyProduct => {
      if (copyProduct.id == product.id) {
        copyProduct.quantity += 1
      }
    })
    dispatch(setProductsAddedToCart(productsInCartCopy))
  }

  const handleRemoveCartItem = async (id) => {
    try {
      const products = productsInCart.filter((product) => product.id !== id);
      if(productsInCart[0].shop_cart_items)
        await axios.delete(`/api/shopcarts/${localStorage.getItem('shopcartId')}/products/${id}`)
      dispatch(setProductsAddedToCart(products));
    } catch (error) {
      console.log(error)
    }
  };

  const handleOnClickCheckOut = async () => {
    try {
      if(!user.isLoggedIn)
        history.push("/login")
      if(localStorage.getItem('orderId')) {
        await axios.put(`/api/shopcarts/${localStorage.getItem('shopcartId')}`, productsInCart)
        dispatch(setOrder({state: 'Payment pending', payment_method: "Cash", total_price: total(), products: productsInCart}))
        return history.push("/checkout")
      }
      /* Genera Carrito nuevo */
      const res = await axios.post('/api/shopcarts', productsInCart)
      const shopcart = res.data
      const shopcartId = shopcart[0].shopCartId
      localStorage.setItem('shopcartId', shopcartId)
      const response = await axios.post('/api/orders', {payment_method: "Cash", state: 'Payment pending', shopcartId}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const order = response.data
      localStorage.setItem('orderId', order.id)
      dispatch(setProductsAddedToCart([]))
      dispatch(setOrder({state: 'Payment pending', payment_method: "Cash", total_price: total(), products: productsInCart}))
      history.push("/checkout")
    } catch (error) {
      console.log({error})
    }
  }

  return (
    <div className="container mt-2 text-primary">
      <div className="row mt-3">
        <table className="table  text-center text-light bg-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {productsInCart.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <th scope="row">
                  <img src={product.image} style={{ width: "4rem" }} />
                </th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    onClick={() => decrease(product)}
                    className="btn btn-primary btn-lg"
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    onClick={() => increase(product)}
                    className="btn btn-primary btn-lg"
                    size="sm"
                  >
                    +
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleRemoveCartItem(product.id)}
                    className="btn btn-danger btn-lg"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        {productsInCart.length ? (
          <button className="btn btn-danger btn-lg" onClick={handleOnClickCheckOut}>Checkout</button>
        ) : null}
      </div>
      <div className="row">
        <div className="col text-center">
          <h4>TOTAL: {`$ ${total()}`}</h4>
        </div>
      </div>
    </div>
  );
}
