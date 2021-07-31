import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const setProductsAddedToCart = createAction("SET_PRODUCT_ADDED");

export const productsAddedToCartFromDb = createAsyncThunk('SET_PRODDUCT_ADDED_DB', (userId) => {
  return axios.get(`/api/users/${userId}/orders/pending`)
              .then(res => {
                const order = res.data[0]
                if(!order)
                  return []
                const shopcart = order.shop_cart
                const products = shopcart.products
                products.forEach(product => {
                  product.quantity = product.shop_cart_items.quantity
                });
                localStorage.setItem('shopcartId', shopcart.id)
                localStorage.setItem('orderId', order.id)
                return products
              })
              .catch(error => console.log({error}))
})

const productsAddedToCartReducer = createReducer([], {

  [setProductsAddedToCart]: (state, action) => action.payload,
  [productsAddedToCartFromDb.fulfilled]: (state, action) => action.payload

});

export default productsAddedToCartReducer;
