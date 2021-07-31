import { createReducer, createAction} from "@reduxjs/toolkit";

const initialState = {
  // state: null,
  // payment_method: null,
  // total_price: null,
  // products: [],
}

export const setOrder = createAction('SET_ORDER')

const orderReducer = createReducer(initialState, {
  [setOrder] : (state, action) => action.payload
})


export default orderReducer;