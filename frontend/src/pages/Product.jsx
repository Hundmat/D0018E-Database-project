import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";

// Stylesheet
import "../stylesheets/product.css";


import {StarRating} from "../Components/Starrating/StarRating";


const Product = ({ pid, id, catID, cat, averageRating, average }) => {
  const location = useLocation();
  const [stock, setStock] = useState(0);

  const availability = (stock) => {
    if (stock <= 0) {
      return "Item sold out";
    } else if (stock < 10) {
      return "Almost out of stock";
    } else {
      return "Item in stock";
    }
  };

  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const addToCart = async () => {

    var loggedIn = false;
    var userID = null;

    // Check if the user is logged in
    try {
      const res = await axios.get("http://localhost:8800/auth");
      if (res.data.Status === "Success") {
        userID = res.data.userId;
        loggedIn = true;
      }
    } catch (err) {
      console.log(err);
    }
    
    if (loggedIn) {
      // If the user is logged in, send add to cart request to the server
      try {
        await axios.post(
          `http://localhost:8800/product/addToCart/${userID}/${location.state.pid}`
        );
        console.log("Post request has been sent to the server!");
        await navigate("/cart");
      } catch (err) {
        console.log(err);
      }
    } else {
      // else, redirect the user to the login page
      try {
        await navigate("/signup");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/product/${location.state.pid}`
        );

        setProduct(res.data);
        setStock(res.data[0].stock);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/category/${location.state.catID}`
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/reviews/${location.state.pid}`
        );
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
    fetchCategory();
    fetchReviews();
  }, [location]);

  return (
    <div>
      <div className="productPage">
        {product.map((p) => (
          <div className="product" key={p.idProduct}>
            <div className="product-image-container">
              {p.image && <img src={p.image} alt="" />}
            </div>
            <div className="product-info-container">
              <div className="product-info">
                <p>{categories.map((c) => c.brand)}</p>
                <h1>{p.name}</h1>
                <p>{p.price} kr</p>
              </div>
              <div className="product-review">
                <StarRating rating={location.state.averageRating} />
              </div>
              <div className="product-size">
                <h4>{p.size}</h4>
              </div>
              <div className="product-buttons-container">
                <button className="product-cart-button" onClick={addToCart} disabled={stock <= 0}>
                  Add to cart
                </button>
              </div>
              <div className="product-stock">
                <p>{availability(p.stock)}</p>
              </div>
              <div className="product-desc">
                <p>{p.prodDescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="product-reviews">
        <h1>Reviews</h1>
        {reviews.map((r) => (
          <div className="product-reviews-review" key={r.idReview}>
            <h3>{r.userName}</h3>
            <StarRating rating={r.rating} />
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
