import { createReducer, createAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';



export const setUsers = createAction('SET_USERS')


export const showUsers = createAsyncThunk('SHOW_USERS', () => {
  return axios.get('/api/users')
  .then(res => res.data)
})

export const setAdmin = createAsyncThunk ("SET_ADMIN", (userID,thunkAPI) => {
  return axios.put(`/api/users/${userID}`, {is_admin: true})
  .then(res => {
    const modifiedUser = res.data[1][0]
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        return users.map(user => {
          if(user.id === modifiedUser.id) {
            return modifiedUser
          }
          return user
        })
      })
      .catch(error => console.log({error}))
  })
  .catch(error => console.log({error}))
})

export const removeAdmin = createAsyncThunk ("REMOVE_ADMIN", (userID,thunkAPI) => {
  return axios.put(`/api/users/${userID}`, {is_admin: false})
  .then(res => {
    const modifiedUser = res.data[1][0]
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        return users.map(user => {
          if(user.id === modifiedUser.id) {
            return modifiedUser
          }
          return user
        })
      })
      .catch(error => console.log({error}))
  })
  .catch(error => console.log({error}))
})



const usersReducer = createReducer([], {
  [setUsers] : (state,action) => action.payload,
  [setAdmin.fulfilled] : (state, action) => action.payload,
  [removeAdmin.fulfilled] : (state, action) => action.payload,
  [showUsers.fulfilled] : (state, action) => action.payload
})
export default usersReducer;


