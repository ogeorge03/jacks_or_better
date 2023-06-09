import React from 'react'
import axios from 'axios'
import { Button, Form, Alert } from 'react-bootstrap'


function Register({setAccessToken, setRefreshToken, setNewAccount, setUser}) {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/register`, {
        username: username,
        password: password
      })
      setUser(username)
      setAccessToken(res.headers['auth-token-access'])
      setRefreshToken(res.headers['auth-token-refresh'])
      document.getElementById("errorRegister").innerHTML = ""
    } catch (error) {
      document.getElementById("errorRegister").innerHTML = "Username already exists"
    }
  }

  return (
    <>
    <div className="register-container">
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
          Register
        </Button>
      </Form>
      <Alert variant="danger" id="errorRegister"></Alert>
      <div className="register-link">
        <p>Already have an account? <a href="/#" onClick={() => setNewAccount(false)}>Click here to login</a></p>
        </div>
      </div>
    </>
  )
}



export default Register
