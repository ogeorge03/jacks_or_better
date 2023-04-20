import React from 'react'
import axios from 'axios'

function Login({setAccessToken, setRefreshToken, setIsAdmin, setUser}) {
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
      document.getElementById("errorLogin").innerHTML = error.response.data
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <div id="errorLogin"></div>
    </>
  )
}

export default Login
