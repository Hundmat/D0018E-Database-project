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

  const addFilterCategory = (category) => {
    if (!selectedCategories.includes(category.value)) {
      setSelectedCategories(prev => ([...prev, category.value]))
    }
  };

  // resets selected categories
  const resetCategory = (e) => {
    const temp = e.removedValues;
    for (const t in temp) {
      setSelectedCategories(selectedCategories.filter(c => c !== temp[t].value));
    }
  };

  // removes single selected category
  const removeCategory = (e) => {
    setSelectedCategories(selectedCategories.filter(c => c !== e.removedValue.value));
  };

  // updates which products are displayed
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProductList(products);
    } else {
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
  const handleSelectChange = (selectedOptions, e) => {
    if (e.action === "clear") {
      resetCategory(e);
    } else if (e.action === "select-option") {
      selectedOptions.forEach(addFilterCategory)
    } else if (e.action === "remove-value") {
      removeCategory(e);
    }
  };

  // gets all options for a category
  const getCatOptions = (cat) => {

    const temp = [];

    products.map((product) => {

      if (!temp.some((e) => e.label === product[cat])) {
        temp.push({ label: product[cat], value: product[cat] });
      }

      return temp;

    });

    return temp;
  };


  return (
    <div className="body">
      <Navbar />
      <div className="browse-container">
        <div className="browse-filter">
          <Select options={getCatOptions('sex')} onChange={handleSelectChange} isMulti placeholder="Sex" className="browse-select" />
          <Select options={getCatOptions('size')} onChange={handleSelectChange} isMulti placeholder="Size" className="browse-select" />
          <Select options={getCatOptions('brand')} onChange={handleSelectChange} isMulti placeholder="Brand" className="browse-select" />
          <Select options={getCatOptions('nameCat')} onChange={handleSelectChange} isMulti placeholder="Sport" className="browse-select" />
          <Select options={getCatOptions('typeCat')} onChange={handleSelectChange} isMulti placeholder="Type" className="browse-select" />
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