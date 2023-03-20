import logo from '../../Images/header.png';
import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

function Nav() {
  return(
    <header>
      <div className="App-header">
        <div className='App-logo-div'>
          <Link className="Apple-words" to="/">
          <img src={logo} className="Apple-logo" alt="logo" />
          </Link>
          <Link className="Apple-words" to="/">
            Sweet Apple Acres
          </Link>
        </div>
        <Link to="/shop" className='nav-links'>Shop</Link>
        <Link to="/cart" className='nav-links'>Cart</Link>
      </div>
    </header>
  )
}
export default Nav