import React from 'react'
import TextField from '@material-ui/core/TextField'
import useStyles from './form.styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsername,
  handlePassword,
}) => (
  <div>
    <form onSubmit={handleLogin} className={useStyles.container} noValidate>
      <Typography variant="h5" gutterBottom>
        Log in
      </Typography>
      <div>
        <TextField
          id="outlined-name"
          autoComplete="username"
          label="Username"
          value={username}
          className={useStyles.textField}
          margin="normal"
          variant="outlined"
          onChange={handleUsername}
        />
      </div>
      <div>
        <TextField
          id="outlined-password-input"
          label="Password"
          value={password}
          onChange={handlePassword}
          className={useStyles.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
      </div>
    </form>
    <Button
      style={{width:'88px'}}
      type="submit"
      onClick={handleLogin}
      variant="contained"
      color="primary"
      className={useStyles.button}
    >
      Login
    </Button>
  </div>
)

export default LoginForm
