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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
