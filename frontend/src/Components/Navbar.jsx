import React from 'react'
import { CiLogin } from "react-icons/ci";
import { Link, useLocation } from 'react-router-dom';
import "../stylesheets/navbar.css"

const Navbar = () => {
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
            <Link className={isActive('/add')} to="/add">
                Add
            </Link>
            <Link className={isActive('/cart')} to="/cart">
                Cart
            </Link>
            <div className='loginbutton'>
                <Link className={isActive('/signup')} to="/signup">
                    <CiLogin size={28} />
                </Link>
            </div>
        </div>

    );
};

export default Navbar;