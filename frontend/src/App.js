// Imports
import React from 'react';
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

import Profile from './Components/Profile/Profile.jsx';
import Navbar from './Components/Navbar/Navbar';
// Stylesheets
import "./stylesheets/style.css";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/add" element={<Add />} />
          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
