import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
		<div>
			<div className='home-button'>
				<NavLink exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton
						user={sessionUser} />
				</div>
			)}
		</div>
		</div>
	);
}

export default Navigation;
