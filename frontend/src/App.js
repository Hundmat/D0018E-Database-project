import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Navbar from "./Components/Navbar"
import Browse from "./pages/Browse";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShoppingCart from "./pages/Shoppingcart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
