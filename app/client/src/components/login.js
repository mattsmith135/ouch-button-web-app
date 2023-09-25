import React from 'react'
import { Component } from "react";
import { Link } from "react-router-dom"; 
import Button from './Button';

function Login() {

    const messages = "Error"
    if (messages.error) {
        console.log(messages.error) 
    }

    return(
        <div className="login">
            <div className="login-wrapper">
                <div className="login-header">
                    <h1 className="login-header__heading">Login to Ouch Button Portal</h1>
                </div>
                <div className="login-content">
                    <form id="login-form" action="/login" method="POST">
                        <div>
                            <label>Email</label>
                            <input type="email" id="email" name="email" required/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" id="password" name="password" required/>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <Link to="/register">
                      <button>Register Page</button>
                    </Link>
                </div>
            </div>
        </div>

export default Login