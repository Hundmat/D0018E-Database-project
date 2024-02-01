import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../stylesheets/add.css"

import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import '../stylesheets/navbar.css';
import '../stylesheets/footer.css';

const Add = () => {
  const [product, setProduct] = useState({
    idCat: "",
    name: "",
    prodDescription: "",
    price: null,
    stock: 100,
    size: "",
    image: "",
    sex: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:8800/products", product);
        navigate("/browse");
    } catch (err) {
        console.log(err)
    }
  };

  console.log(product);

  return (
    <div>
      <Navbar/>
      <div className="add-form-container">
        <div className="add-form">
          <h1>Add new product</h1>

          <input
            type="number"
            placeholder="idCat"
            onChange={handleChange}
            name="idCat"
          />
          <input
            type="text"
            placeholder="name"
            onChange={handleChange}
            name="name"
          />
          <textarea
            type="text"
            placeholder="description"
            onChange={handleChange}
            name="prodDescription"
            id="add-desc"
          />
          <input
            type="number"
            placeholder="price"
            onChange={handleChange}
            name="price"
          />
          <input
            type="text"
            placeholder="size"
            onChange={handleChange}
            name="size"
          />
          <input
            type="text"
            placeholder="image"
            onChange={handleChange}
            name="image"
          />
          <input 
            type="text" 
            placeholder="sex" 
            onChange={handleChange} 
            name="sex" 
          />
          <button onClick={handleClick}>Add</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Add;
