// Imports
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Pages
import Add from './pages/Add';
import Browse from './pages/Browse';
import Product from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Stylesheets
import "./stylesheets/style.css";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browse/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
