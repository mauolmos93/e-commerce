/* 
//user actions

add-product
delete-product

//admin actions

add-product
delete-product
post-product
put-product // <--- modifica
*/
import { createReducer, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    products: [],
    productSelected: {},
}


export const selectProduct = createAsyncThunk('SELECT_PRODUCT', (param, thunkAPI)=>{
    return axios.get(`/api/products/${param}`)
    .then(res => res.data)
})

export const selectProductsByCategory = createAsyncThunk('SELECT_PRODUCTS_BY_CATEGORY', (category)=>{
    return axios.get(`/api/products/filter?category=${category}`)
    .then(res => res.data)
    .then(filteredProducts => {
        const products = {
            products: [],
            productSelected: {}
        }
        products.products.push(...filteredProducts)
        return products
    })
})


export const showProduct = createAsyncThunk('SHOW_PRODUCT', () => {
    return axios.get('/api/products')
    .then(res => res.data)
})

const productReducer = createReducer(initialState, {
    [showProduct.fulfilled] : (state, action) => {state.products = action.payload},
    [selectProduct.fulfilled] : (state, action) => {state.productSelected = action.payload},
    [selectProductsByCategory.fulfilled]: (state, action) => action.payload
})

export default productReducer;