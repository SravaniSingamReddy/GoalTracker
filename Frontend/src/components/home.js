import React from 'react'
import NavBarP from './Navbar'

const Home = () => {
  return (
    <div className="main">
      <NavBarP/>
      <div className="welcome-text">
      <h2 className="text">Welcome to Goals Tracker Website </h2>
      <a href="/" className="btnone">Contanct Us</a>
      </div>
    </div>
  )
}

export default Home