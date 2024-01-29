import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Add from './pages/Add';
import Products from './pages/Products';
import "./style.css";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/add" element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
