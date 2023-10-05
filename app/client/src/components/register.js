import React, { useState } from 'react'
import axios from 'axios'; 

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
                    <h1 className="register-header__heading">Register</h1>
                </div>
                <div className="register-content">
                    <form id="register-form" action="/register" method="POST">
                        <div>
                            <label>Name</label>
                            <input type="text" id="name" name="name" required onChange={e => setRegisterName(e.target.value)} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" id="email" name="email" required onChange={e => setRegisterEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" id="password" name="password" required onChange={e => setRegisterPassword(e.target.value)} />
                        </div>
                        <button type="submit" onClick={register}>Register</button>
                    </form>
                </div>
            </div>
            <br></br>
            {/*<button type="submit">Register</button> <Link to="/login"><Button text="Login Page"></Button></Link>*/}

        </div>
    )
}

export default Register;
