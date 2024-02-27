import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";

import "../stylesheets/post.css";

const Post = ({ order_ID, userName }) => {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8800/post/${location.state.order_ID}`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [location]);

  const navigate = useNavigate();

  const handleRatings = (e) => {
    setRatings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(ratings);
  };

  const handleChange = (e) => {
    setReviews((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    var loggedIn = false;
    const username = location.state.userName;

    // Check if the user is logged in
    try {
      const res = await axios.get("http://localhost:8800/auth");
      if (res.data.Status === "Success") {
        loggedIn = true;
      }
    } catch (err) {
      console.log(err);
    }

    if (loggedIn) {
      // If the user is logged in, send add to cart request to the server
      // send reviews to backend
      try {
        await axios.post(`http://localhost:8800/post/addReviews`, {
          reviews,
          username,
          ratings,
        });

        await navigate("/");
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

  return (
    <div className="body">
      <div className="post">
        <div className="post-container">
          <h1>
            Order {location.state.order_ID} - {location.state.userName}
          </h1>
          <div className="post-products-wrapper">
            <div className="post-products">
              {products.map((p) => (
                <div className="post-product" key={p.idProduct}>
                  <h3>{p.brand}</h3>
                  <h3>{p.name}</h3>
                  <p>{p.sex}</p>
                  <p>Size: {p.size}</p>
                  <p>{p.price} kr</p>
                  <div className="post-product-img-container">
                    {p.image && <img src={p.image} alt="" />}
                  </div>
                  <textarea
                    type="text"
                    onChange={handleChange}
                    placeholder="Leave a review of the product!"
                    name={p.idProduct}
                    id="review"
                  ></textarea>
                  <input
                    type="number"
                    placeholder="rating"
                    onChange={handleRatings}
                    name={p.idProduct}
                  ></input>
                </div>
              ))}
            </div>
          </div>
          <button className="post-submitButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
