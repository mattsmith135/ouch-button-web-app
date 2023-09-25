import React from 'react'

function Register() {

  return (
    <div>
      <h1>Register</h1>
      <form action="/register" method="POST">
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

      <a href="/login">Login</a>
    </div>
  )
}

export default Register