import React, { useState } from 'react'
import axios from 'axios'; 
import Logo from "../assets/logo.png"; 

function Register() {
    const [registerName, setRegisterName] = useState(""); 
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState(); 

    const register = (event) => {
        event.preventDefault(); 
        axios({
            method: "post", 
            data: {
                TherapistName: registerName,
                TherapistEmail: registerEmail, 
                TherapistPassword: registerPassword
            },
            withCredentials: true,
            url: "http://localhost:5000/auth/register",
        }).then(res => console.log(res));
    };

    return (
        <div className="register">
            <div className="register-wrapper">
                <div className="register-header">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h1 className="register-header__heading">Register</h1>
                </div>
                <div className="register-content">
                    <form id="register-form" action="/register" method="POST">
                        <label>Name</label>
                        <input type="text" id="name" name="name" required onChange={e => setRegisterName(e.target.value)} />
                        <label>Email</label>
                        <input type="email" id="email" name="email" required onChange={e => setRegisterEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" id="password" name="password" required onChange={e => setRegisterPassword(e.target.value)} />
                        <button type="submit" onClick={register}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
