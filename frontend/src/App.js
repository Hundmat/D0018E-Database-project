import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Add from './pages/Add';
import Books from './pages/Books';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
