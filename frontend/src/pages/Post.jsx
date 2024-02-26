import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";

import "../stylesheets/post.css";

const Post = ({ order_ID, oid }) => {
  const location = useLocation();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.post("http://localhost:8800/post/446426922");
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [location]);

  return (
    <div className="body">
      <div className="post">
        <div className="post-container">
          <h1>Post Purchase for order {location.state.order_ID}</h1>
          <div className="post-products-wrapper">
            <div className="post-products">
              {products.map((product) => (
                <div
                  className="post-product"
                  key={product.idProduct}
                >
                  {product.image && <img src={product.image} alt="" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
