import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";

import "../stylesheets/post.css";

const Post = ({ order_ID, oid }) => {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8800/post/${location.state.order_ID}`
        );
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [location]);

  const handleChange = (e) => {
    setReviews((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.name, reviews);
  };

  const handleSubmit = () => {
    console.log(reviews);
  };

  return (
    <div className="body">
      <div className="post">
        <div className="post-container">
          <h1>Order {location.state.order_ID}</h1>
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
                </div>
              ))}
            </div>
          </div>
          <button className="submitButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
