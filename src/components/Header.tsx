import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth0();
  const location = useLocation();

  return (
    <div className="navbar bg-primary fixed z-10">
      <div className="flex-1"></div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-secondary btn-circle avatar w-16 h-16 bg-transparent border-0">
            <div className="w-14 rounded-full">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img draggable="false" src={user?.picture} alt="profile picture of logged in user"
                referrerPolicy="no-referrer"/>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-secondary rounded-box w-52">
            <li><Link to={`/profile${location.search}`}>Profile</Link></li>
            <li><LogoutButton/></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
