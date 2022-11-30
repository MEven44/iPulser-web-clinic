
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from './../images/logo.jpeg'
import '../index.css'


const NavBar = ({loaded}) => {

  let currentUser = useSelector(state=>state.session.user)
  
  let sessionLinks;
 
  if (currentUser) {
  sessionLinks = (
    <nav>
      <NavLink id="text-bar" to="/" exact={true} activeClassName="active">
        Summery Page
      </NavLink>

      <NavLink
        id="text-bar"
        to="/trial-design"
        exact={true}
        activeClassName="active"
      >
        Design a trial
      </NavLink>

      <LogoutButton />
    </nav>
  );
  
} else {
  sessionLinks = (
    <>
     
      <button>
        <NavLink
          id="a-nav"
          to="/login-signup"
          exact={true}
          activeClassName="active"
        >
          Login - Sign Up
        </NavLink>
       </button>
    </>
  );
}

return (
  <>
  <img src={logo} alt='logo' />
  <div id='header'>{loaded && sessionLinks}</div>
  </>
)
}

export default NavBar;
