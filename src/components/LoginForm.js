import React from 'react'

const LoginForm = ({handleLogin, username, setUsername, setPassword, password}) => {
    return (
        <div>
            <h1>login to application</h1>

            {/* <Notification message={errorMessage} /> */}

            <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
