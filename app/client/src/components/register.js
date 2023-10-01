import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import logo from '../assets/logo.png';

function Register() {
  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="register-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="register-header__heading">Register</h1>
        </div>
        <div className="register-content">
          <form id="register-form" action="/register" method="POST">
            <div className="NameRegister">
              <label>Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="EmailRegister">
              <label>Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="PasswordRegister">
              <label>Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <br></br>
            <button type="submit">Register</button> <Link to="/login"><Button text="Login Page"></Button></Link>
          </form>
          
          
        </div>
      </div>
    </div>
  );
}

export default Register;
