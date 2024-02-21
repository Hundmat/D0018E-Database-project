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
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
<<<<<<< Updated upstream
import Profile from './Components/Profile';
=======
import Order from './pages/Order';

>>>>>>> Stashed changes
// Stylesheets
import "./stylesheets/style.css";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
<<<<<<< Updated upstream
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/add" element={<Add />} />
          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
=======
          <Route path="/" element={<Home/>}/>
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<Order/>}/>
>>>>>>> Stashed changes
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
