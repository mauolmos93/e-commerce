import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import {useHistory } from "react-router-dom";
import validator from 'validator'
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import '../assets/styles/components/Register.scss'


function  Register  ()  {
  const history = useHistory()
  const dispatch = useDispatch()

  const [formRegisterValues, handleInputChange] = useForm({
    user_name: "",
    first_name: "",
    last_name: "",
    user_address:"",
    shipping_address:"",
    phone_number:"",
    email:"",
    password:"",
  });
  const { user_name, first_name, password, last_name, user_address, shipping_address, phone_number, email } = formRegisterValues;


  const [emailMsg, setEmailMsg] = useState("");

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailMsg("Valid Email!");
    } else {
      setEmailMsg("enter valid Email!");
    }
    handleInputChange(e);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await axios.post('/api/register', formRegisterValues)
      alert("El usuario se ha creado con éxito.")
      history.push('/login')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="registerBody">
      <form className="registerForm" onSubmit={handleSubmit}>
      <div className='formContainer'>
        <div className="welcome-text">Welcome !</div>

        <div className="createAcc">Register</div>

        <div className="emailInput">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={first_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="passInput">
        <input
            name="last_name"
            placeholder="Last Name"
            value={last_name}
            onChange={handleInputChange}
            required
          />
        </div>
                  
        <div className="emailInput">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={ (e) => validateEmail(e)}
           
            required
          />
          <br />
          <span>{emailMsg}</span>
        </div>
        
        <div className="passInput">
        <input
            name="user_name"
            placeholder="User Name"
            value={user_name}
            onChange={handleInputChange}
            required
          />
        </div>            
                    
        <div className="passInput">
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        
        <div className="passInput">
        <input
            name="user_address"
            placeholder="User address"
            value={user_address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="passInput">
        <input
            name="shipping_address"
            placeholder="Shipping Address"
            value={shipping_address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="passInput">
        <input
            name="phone_number"
            placeholder="Phone Number"
            value={phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="registerBtn" >
          Register
        </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
