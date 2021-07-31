import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useHistory } from "react-router-dom";
import validator from 'validator'
import {useDispatch} from "react-redux"
import { setUser } from '../redux/user';
import axios from 'axios'
import '../assets/styles/components/LogIn.scss'


function LogIn() {
  const history = useHistory();
  const dispatch = useDispatch()
  const [formLoginValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formLoginValues;
  const [emailMsg, setEmailMsg] = useState("")

  
  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const res = await axios.post('/api/login', formLoginValues)
      const user = res.data
      localStorage.setItem('token', user.token)
      dispatch(setUser({...user, isLoggedIn: true}))
      alert("Se ha logueado con éxito")
      history.push('/products')
    } catch (error) {
      if(error.response.status === 400 || 401)
        alert("Credenciales inválidas")
    }
  }


  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailMsg("Valid Email!");
    } else {
      setEmailMsg("enter valid Email!");
    }
    handleInputChange(e)
    
  };

  return (
    <div className="loginBody">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="loginFormContainer">
          <div className="login-welcome-text">Welcome !</div>

          <div className="loginCreateAcc">Log in to access your account.</div>

          <div className="loginEmailInput">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => validateEmail(e)}
              required
            />
          </div>
          <br />
          <span>{emailMsg}</span>
          <div className="loginPassInput">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="loginBtn"
          >
            Log in
       
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
