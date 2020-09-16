import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


export const NavBar = ()=> {

  const auth = useContext(AuthContext)
  const history = useHistory()
  const logoutHandler = event => {
    event.preventDefault()
    auth.logOut()
    history.push('/')
  }
  return (
    <nav>
        <div className="nav-wrapper blue darken-1 nav-style">
          <span className="brand-logo">MERN</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to='/create'>Create</NavLink></li>
            <li><NavLink to='/links'>Links</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
          </ul>
        </div>
      </nav>
  )

}
