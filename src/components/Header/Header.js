import React from 'react';
import './Header.css';
import { auth } from '../../firebase/Config';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    

    const handleLogOut = () => {
        auth
        .signOut()
        .then(() => {
            localStorage.removeItem('user');
            navigate('/');
        })
    }

    if (location.pathname === "/") {
      return <></>
    }

    return (
        <div className="header">
            <nav>
                <h2>Dog Breeds</h2>
                <button onClick={handleLogOut}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Header;
