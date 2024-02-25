import React from 'react'
import { CiLogin } from "react-icons/ci";
import { Link, useLocation, NavLink } from 'react-router-dom';
import "./navbar.css"

const Navbar = ({ isAdmin }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="topnav">
            <Link className={isActive('/')} to="/">
                Home
            </Link>
            <Link className={isActive('/browse')} to="/browse">
                Browse
            </Link>
            {isAdmin && (
                <Link className={isActive('/add')} to="/add">
                    Add
                </Link>
            )}
            <Link className={isActive('/cart')} to="/cart">
                Cart
            </Link>
            <NavLink className={isActive('/Profile')} to="/profile">
                Profile
            </NavLink>
            <div className='loginbutton'>
                <Link className={isActive('/signup')} to="/signup">
                    <CiLogin />
                </Link>
            </div>
        </div>

    );
};

export default Navbar;