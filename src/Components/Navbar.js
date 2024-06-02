import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar">
      <p>CRUD API</p>
      <div className="links">
      <a href="/">HOME</a>
      <a href="/allusers">ALL USERS</a>
      <a href="/create">ADD NEW USER</a>
      </div>
    </div>
  )
}

export default Navbar