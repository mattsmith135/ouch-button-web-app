import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState(); 

    const login = (event) => {
        event.preventDefault(); 
        axios({
            method: "post", 
            data: {
                // Note that Passport.JS expects req.body to contain 'username' and 'password'
                TherapistEmail: loginEmail, 
                TherapistPassword: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:5000/auth/login",
        }).then(res => console.log(res));
    };

    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-header">
                    <h1 className="login-header__heading">Login to Ouch Button Portal</h1>
                </div>
                <div className="login-content">
                    <form id="login-form" action="/login" method="POST">
                        <div>
                            <label>Email</label>
                            <input type="email" id="email" name="email" required onChange={e => setLoginEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" id="password" name="password" required onChange={e => setLoginPassword(e.target.value)} />
                        </div>
                        <button type="submit" onClick={login}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login