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

const Browse = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fileredProductList, setFilteredProductList] = useState([]);

  // make prettier by not needing .value
  const addFilterCategory = (category) => {
    if(!selectedCategories.includes(category.value)){
      setSelectedCategories(prev => ([...prev, category.value]))
      console.log("added:", category.value);
    }
  };

  // add functionality to only clear a certain category
  const resetCategory = () => {
    setSelectedCategories([]);
  }
  
  // add functionality to be able to filter multiple categories at once
  useEffect(() => {
    if(selectedCategories.length === 0){
      setFilteredProductList(products);
      console.log("default page");
    } else{
      setFilteredProductList(products.filter((item) => (selectedCategories.includes(item.size))));
      console.log("filtered page");
    }
  }, [selectedCategories, products]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8800/browse");
      setProducts(res.data);
      setFilteredProductList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Enables clickable products
  const navigate = useNavigate();
  const handleClick = (id) => async (e) => {
    e.preventDefault();
    try {
      await navigate(`/product`, { state: { pid: id } });
    } catch (err) {
      console.log(err);
    }
  };

  // add functionality to only clear a certain category
  const handleSelectChange = (selectedOptions) => {
    if(selectedOptions.length === 0) {
      resetCategory();
      console.log("cleared");
    } else {
      console.log("changed:", selectedOptions);
      selectedOptions.forEach(addFilterCategory)
    }
  };

  const sizes = [
    { label: 'Small', value: 'S' },
    { label: 'Medium', value: 'M' },
    { label: 'Large', value: 'L' }
  ];

  const brands = [
    { label: 'Brand1', value: 'B1' },
    { label: 'Brand2', value: 'B2' },
    { label: 'Brand3', value: 'B3' }
  ];

  return (
    <div>
      <Navbar />
      <div className="browse-container">
        <div className="browse-filter">
          <Select options={sizes} onChange={handleSelectChange} isMulti placeholder="Size" className="browse-select"/>
          <Select options={brands} onChange={handleSelectChange} isMulti placeholder="Brand" className="browse-select"/>
        </div>
        <div className="browse-products">
          {fileredProductList.map((product) => (
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
