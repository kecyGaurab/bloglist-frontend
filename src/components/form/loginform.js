import React from 'react'

const LoginForm = ({handleLogin,username,password, handleUsername, handlePassword}) => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          autoComplete="username"
          value={username}
          name="Username"
          onChange={handleUsername}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="current-password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

export default LoginForm
