import React from 'react'

function Register() {

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
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
