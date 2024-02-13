import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { CiHeart } from "react-icons/ci";

// Stylesheet
import "../stylesheets/product.css";

// Navbar & Footer
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../stylesheets/navbar.css";
import "../stylesheets/footer.css";


const Product = ({ pid, id }) => {
  const location = useLocation();

  const availability = (stock) => {
    if (stock === 0) {
      return 'Item sold out';
    } else if (stock < 10) {
      return 'Almost out of stock';
    } else {
      return 'Item in stock';
    }
  };

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/product/${location.state.pid}`
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [location]);

  return (
    <div>
      <Navbar />
      <div className="productPage">
        {product.map((p) => (
          <div className="product" key={p.idProduct}>
            <div className="product-image-container">
              {p.image && <img src={p.image} alt="" />}
            </div>
            <div className="product-info-container">
              <div className="product-info">
                <p>Brand</p>
                <h1>{p.name}</h1>
                <p>{p.price} kr</p>
              </div>
              <div className="product-review">
                Rating
              </div>
              <div className="product-size">
                <h4>{p.size}</h4>
              </div>
              <div className="product-buttons-container">
                <button className="product-cart-button">Add to cart</button>
                <button className="product-favourite-button"><CiHeart/></button>
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
      <Footer />
    </div>
  );
};

export default Product;
