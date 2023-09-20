import React from 'react'

function register(){

    app.post('/register', checkNotAuthenticated, async (req, res) => {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10)
          users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          })
          res.redirect('/login')
        } catch {
          res.redirect('/register')
        }
      })

    return(
        <div>
            <h1>Register</h1>
<form action="/register" method="POST">
    <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required/>
    </div>
    <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required/>
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required/>
    </div>
    <button type="submit">Register</button>
</form>


<a href="/login">Login</a>

</div>
)
}

export default register