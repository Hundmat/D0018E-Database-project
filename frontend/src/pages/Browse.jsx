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
    }
  };

  // add functionality to only clear a certain category
  const resetCategory = (e) => {
    const temp = e.removedValues;
    for (const t in temp){
      setSelectedCategories(selectedCategories.filter( c => c !== temp[t].value));
    }
  };
  
  // add functionality to be able to filter multiple categories at once DONE
  useEffect(() => {
    if(selectedCategories.length === 0){
      console.log("selected categories: ", selectedCategories);
      setFilteredProductList(products);
    } else{
      console.log("selected categories: ", selectedCategories);
      setFilteredProductList(products.filter(item => selectedCategories.every(att => Object.values(item).includes(att))));
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
  const handleSelectChange = (selectedOptions, e) =>{
    if(selectedOptions.length === 0) {
      resetCategory(e);
    } else {
      selectedOptions.forEach(addFilterCategory)
    }
  };

  const sex = [
    { label: 'Child', value: 'kid' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  const size = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
  ];

  const brand = [
    { label: 'Brand1', value: 'B1' },
    { label: 'Brand2', value: 'B2' },
    { label: 'Brand3', value: 'B3' }
  ];

  const catName = [
    { label: 'Football', value: 'football' },
    { label: 'Climbing', value: 'climbing' },
    { label: 'Running', value: 'running' }
  ];

  const catType = [
    { label: 'Shoes', value: 'shoe' },
    { label: 'Shirt', value: 'shirt' },
    { label: 'Pants', value: 'pants' }
  ];

  return (
    <div>
      <Navbar />
      <div className="browse-container">
        <div className="browse-filter">
          <Select options={sex} onChange={handleSelectChange} isMulti placeholder="Sex" className="browse-select"/>
          <Select options={size} onChange={handleSelectChange} isMulti placeholder="Size" className="browse-select"/>
          <Select options={brand} onChange={handleSelectChange} isMulti placeholder="Brand" className="browse-select"/>
          <Select options={catName} onChange={handleSelectChange} isMulti placeholder="Sport" className="browse-select"/>
          <Select options={catType} onChange={handleSelectChange} isMulti placeholder="Type" className="browse-select"/>
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
              <p>{product.sex}</p>
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