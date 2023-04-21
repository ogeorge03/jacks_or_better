import React from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

function Login({setAccessToken, setRefreshToken, setIsAdmin, setUser, setNewAccount}) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const res = await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/login`, {
        username: username,
        password: password
      })
      setUser(username)
      // setAccessToken(res.headers['auth-token-access'])
      setAccessToken(res.headers['auth-token'])
      setRefreshToken(res.headers['auth-token-refresh'])
      setIsAdmin(res.data.role === "admin")
      document.getElementById("errorLogin").innerHTML = ""
    } catch (error) {
      document.getElementById("errorLogin").innerHTML = error
    }
  }

  return (
    <>
    <div className="login-container">
      <Form onSubmit={handleSubmit}>
         <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <div id="errorLogin"></div>
      <div className="register-link">
        <p>Don't have an account? <a href="#" onClick={() => setNewAccount(true)}>Click here to register</a></p>
        </div>
      </div>
    </>
  )
}

export default Login
