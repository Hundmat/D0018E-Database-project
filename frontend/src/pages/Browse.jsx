import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Stylesheet
import "../stylesheets/browse.css";

// Navbar & Footer
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../stylesheets/navbar.css";
import "../stylesheets/footer.css";

import "../Components/DropdownMenu";

const Browse = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/browse");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProducts();
  }, []);

  const navigate = useNavigate();

  const handleClick = (id) => async (e) => {
    e.preventDefault();
    try {
      await navigate(`/product`, { state: { pid: id } });
    } catch (err) {
      console.log(err);
    }
  };

  const sizes = [
    { label: 'Small', value: 'S' },
    { label: 'Medium', value: 'M' },
    { label: 'Large', value: 'L' }
  ];

  const brands = [
    { label: 'Small', value: 'S' },
    { label: 'Medium', value: 'M' },
    { label: 'Large', value: 'L' }
  ];

  return (
    <div>
      <Navbar />
      <div className="browse-container">
        <div className="browse-filter">
          <Select options={sizes} isMulti placeholder="Size" className="browse-select"/>
          <Select options={brands} isMulti placeholder="Brand" className="browse-select"/>
        </div>
        <div className="browse-products">
          {products.map((product) => (
            <div
              className="browse-product"
              onClick={handleClick(product.idProduct)}
              key={product.idProduct}
            >
              {product.image && <img src={product.image} alt="" />}
              <p>Rating</p>
              <p>Brand</p>
              <h2>{product.name}</h2>
              <p>{product.price} kr</p>
              <p>{product.size}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
