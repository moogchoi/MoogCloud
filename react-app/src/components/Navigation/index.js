import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { logout } from '../../store/session';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import github from '../Images/github.svg';
import logo from '../Images/logo.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
    dispatch(logout());
  };

	return (
    <div className='nav-container'>
      <div className='left-container'>
        <div className='logo-container'>
          <NavLink to="/" id='landing-logo'>
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
      </div>
      <div className="right-nav-container">
        <div className='github-links'>
          <div className='github-developer'>
          <a href="https://github.com/moogchoi">
            <div className='github'>
              <img
			  				src={github}
                id="github-logo"
                alt=""
              ></img>
            </div>
          </a>
          </div>
        </div>
        {sessionUser ? (
          <><button onClick={handleLogout} className="login">
            Logout
          </button>
            <NavLink className="signup" to="/new">
              Upload
            </NavLink>
						<NavLink className="login" to="/current">
              Manage
            </NavLink></>
        ) : (
          <>
            <OpenModalButton
          		buttonText="Log In"
          		className="login"
          		modalComponent={<LoginFormModal />}
        		/>
            <OpenModalButton
         			buttonText="Sign Up"
          		className="signup"
          		modalComponent={<SignupFormModal />}
        		/>
          </>
        )}
      </div>
    </div>
  );
}
export default Navigation;
