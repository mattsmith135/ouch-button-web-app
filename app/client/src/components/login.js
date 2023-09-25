import React from 'react'
import { Component } from "react";
import { Link } from "react-router-dom"; 
import Button from './Button';

function login(){

    const messages = "Error"
    if (messages.error) {
        console.log(messages.error) 
    }

    return(
        <div className="login">
            <div className="login-wrapper">
                <div className="login-header">
                    <h1 className="login-header_heading">Login to Ouch Button website</h1>
                </div>
                <form action="/login" method="POST">
        
                <div className="login-email">
                    <label for="email">Email: </label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div className="login-password">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button class="LoginButton" type="submit">Login</button>
                </form>
                
                <Link to="/register"><button class="RegisterLink">Register Page</button></Link>
                
            </div>
        </div>
        
    )
}

export default login