import { createReducer, createAction} from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  full_name: null,
  first_name: null,
  last_name: null,
  user_address: null,
  shipping_address: null,
  phone_number: null,
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isAdmin: false,
}

export const setUser = createAction('SETUSER')

const userReducer = createReducer(initialState, {
  [setUser] : (state, action) => action.payload
})


export default userReducer;