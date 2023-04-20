import React from 'react'
import axios from 'axios'

function Logout() {

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`${process.env.REACT_APP_AUTH_SERVER}/logout`, {
        headers: {
          'auth-token-access': localStorage.getItem('auth-token-access'),
          'auth-token-refresh': localStorage.getItem('auth-token-refresh')
        }
      })
      localStorage.removeItem('auth-token-access')
      localStorage.removeItem('auth-token-refresh')
      document.getElementById("errorLogout").innerHTML = ""
    } catch (error) {
      document.getElementById("errorLogout").innerHTML = error.response.data
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">Logout</button>
      </form>
      <div id="errorLogout"></div>
    </>
  )
}

export default Logout
