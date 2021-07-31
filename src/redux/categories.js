import { createReducer, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = []


export const showCategories = createAsyncThunk('SHOW_CATEGORIES', () => {
    return axios.get('/api/categories')
    .then(res => res.data.categories)
})

const categoriesReducer = createReducer(initialState, {
    [showCategories.fulfilled] : (state, action) => action.payload
})

export default categoriesReducer;