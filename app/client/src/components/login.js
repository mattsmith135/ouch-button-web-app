import React from 'react'

function login(){

    const messages = "Error"
    if (messages.error) {
        console.log(messages.error) 
    }

    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/Upload',
        failureRedirect: '/login',
        failureFlash: true
      }))

    return(
        <div>

        <h1>Login</h1>

    <form action="/login" method="POST">
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required/>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required/>
        </div>
        <button type="submit">Login</button>
    </form>


<a href="/register">Register</a>

</div>
)
}

export default login