import React from 'react'
import { Component } from "react";
import { Link } from "react-router-dom"; 
import Button from './Button';

function register(){
    return(
        <div className="register">
            <div className="register-wrapper">
                <div className="register-header">
                    <h1 className="register-header_heading">Register to Ouch Button</h1>
                </div>    
            <form action="/register" method="POST">

            <div className="register-name">
                <label for="name">Name </label>
                <input type="text" id="name" name="name" required/>
            </div>
            <div className="register-email">
                <label for="email">Email </label>
                <input type="email" id="email" name="email" required/>
            </div>
            <div className="register-password">
                <label for="password">Password </label>
                <input type="password" id="password" name="password" required/>
                <br></br>
            </div>
                <button class="RegisterButton" type="submit">Register</button>
            </form>

            
                <Link to="/login"><button class="LoginLink">Login Page</button></Link>
                
                </div>

</div>
)
}

export default register 