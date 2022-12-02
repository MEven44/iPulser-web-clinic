
import React from 'react';
import { NavLink, Link, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logo from './../images/iPulser Identity/iPulserLogo_s.png'
import '../index.css'


const NavBar = ({loaded}) => {

  let currentUser = useSelector(state=>state.session.user)
  const history = useHistory()
  let sessionLinks;
 


  if (currentUser) {
  sessionLinks = (
    <nav>
      <NavLink id="text-bar" to="/summery" exact={true} activeClassName="active">
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
     
    </>
  );
}

return (
  <>
    <nav id="header">
     
        <NavLink to='/'>
            <img src={logo} alt="logo"/>
        </NavLink>
      
      <div id="header">{loaded && sessionLinks}</div>
     <div className="contact-text">Developer: Moran Even</div>
                <div className="contact-buttons-div">
                  <Link
                    className="contact-button"
                    to={{ pathname: "https://github.com/MEven44" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-square-github" />
                  </Link>
                  <Link
                    className="contact-button"
                    to={{ pathname: "https://www.linkedin.com/in/moran-even/" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </div>
              
    </nav>
  </>
);
}

export default NavBar;
