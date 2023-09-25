import React from 'react'

function Login() {

    const messages = "Error"
    if (messages.error) {
        console.log(messages.error) 
    }

    return(
        <div>
            <h1>Login</h1>

            <form action="/login" method="POST">
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

            <a href="/register">Register</a>   
        </div>
)
}

export default Login