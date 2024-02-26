// Imports
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Pages
import Home from './pages/Home';
import Add from './pages/Add';
import Browse from './pages/Browse';
import Product from './pages/Product';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Post from './pages/Post';

import Profile from './Components/Profile/Profile.jsx';
import Navbar from './Components/Navbar/Navbar';
// Stylesheets
import "./stylesheets/style.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Retrieve isAdmin from localStorage on component mount
    const isAdminStored = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminStored === 'true');
  }, []);

  const handleLogin = (adminStatus) => {
    console.log("adminStatus: ", adminStatus);
    setIsAdmin(adminStatus);
    localStorage.setItem('isAdmin', adminStatus.toString());
  }



  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar isAdmin={isAdmin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/add" element= {isAdmin ? <Add /> : null} />
          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
