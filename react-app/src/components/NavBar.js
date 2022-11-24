
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({loaded}) => {

  let currentUser = useSelector(state=>state.session.user)
  console.log ("NAVIGATION BAR USER", currentUser)
  let sessionLinks;
 
  if (currentUser) {
  sessionLinks = (
  
    <nav>
        
          <NavLink to='/' exact={true} activeClassName='active'>
            Summery Page
          </NavLink>
      
        
          <NavLink to='/new-trial' exact={true} activeClassName='active'>
            Design a trial
          </NavLink>
        
         <NavLink to='/treatment' exact={true} activeClassName='active'>
            Treatment controls
          </NavLink>
        
        
          <LogoutButton />
        
    </nav>
  );
  
} else {
  sessionLinks = (
 <>
  
     <NavLink to="/login-signup" exact={true} activeClassName="active">
       Login - Sign Up
     </NavLink>
   
 </>
  )
}

return <div id='header'>{loaded && sessionLinks}</div>
}

export default NavBar;
