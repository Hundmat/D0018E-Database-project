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

  // resets selected categories
  const resetCategory = (e) => {
    const temp = e.removedValues;
    for (const t in temp){
      setSelectedCategories(selectedCategories.filter( c => c !== temp[t].value));
    }
  };

  // removes single selected category
  const removeCategory = (e) => {
    setSelectedCategories(selectedCategories.filter( c => c !== e.removedValue.value));
  };
  
  // updates which products are displayed
  useEffect(() => {
    if(selectedCategories.length === 0){
      setFilteredProductList(products);
    } else{
      setFilteredProductList(products.filter(item => selectedCategories.every(att => Object.values(item).includes(att))));
    }
  }, [selectedCategories, products]);

  // fetches all products from database
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

  // enables clickable products
  const navigate = useNavigate();

  const handleClick = (id, cat) => async (e) => {
    e.preventDefault();
    try {
      await navigate(`/product`, { state: { pid: id, catID: cat } });
    } catch (err) {
      console.log(err);
    }
  };

  // handles select changes
  const handleSelectChange = (selectedOptions, e) =>{
    if(e.action === "clear") {
      resetCategory(e);
    } else if (e.action === "select-option"){
      selectedOptions.forEach(addFilterCategory)
    } else if (e.action === "remove-value"){
      removeCategory(e);
    }
  };

  const sex = [
    { label: 'Kid', value: 'Kid' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  const size = [
    { label: 'Small', value: 'Small' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Large', value: 'Large' }
  ];

  const brand = [
    { label: 'Nike', value: 'Nike' },
    { label: 'Adidas', value: 'Adidas' },
    { label: 'Oakley', value: 'Oakley' }
  ];

  const catName = [
    { label: 'Football', value: 'Football' },
    { label: 'Climbing', value: 'Climbing' },
    { label: 'Winter', value: 'Winter' }
  ];

  const catType = [
    { label: 'Shoes', value: 'Shoe' },
    { label: 'Shirt', value: 'Shirt' },
    { label: 'Helmet', value: 'Helmet' }
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
              onClick={handleClick(product.idProduct, product.productRelation)}
              key={product.idProduct}
            >
              {product.image && <img src={product.image} alt="" />}
              <p>{product.brand}</p>
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