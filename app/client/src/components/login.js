import React from 'react'
import { Component } from "react";
import { Link } from "react-router-dom"; 
import Button from './Button';
import logo from "../assets/logo.png"; 

function Login() {

    const messages = "Error"
    if (messages.error) {
        console.log(messages.error) 
    }

    return(
        <div className="login">
            <div className="login-wrapper">
                <div className="login-header">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="login-header__heading">Login to Ouch Button Portal</h1>
                </div>
                <div className="login-content">
                <form id="login-form" action="/login" method="POST">
                    <div className="EmailLogin">
                        <label>Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div className="PasswordLogin">
                        <label>Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                <br></br>
                <Button type="submit" text="Login">Login</Button> <Link to="/register"><Button text="Register Page"></Button></Link>
                </form>
                </div>
            </div>
        </div>
    )}

export default Login