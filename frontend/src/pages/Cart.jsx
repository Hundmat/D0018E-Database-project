import React, { useEffect, useState } from 'react';
import '../stylesheets/cart.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { BsCartX } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

async function getCart(formdata) {
  console.log(formdata);
  try {
    const response = await axios.post("http://localhost:8800/cart",{userID: formdata});
    console.log(JSON.parse(JSON.stringify(response.data)));
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};



async function getCat(e) {
  try {
    const response = await axios.post("http://localhost:8800/cat", { id: e });
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

async function getProducts(e) {
  try {
    const response = await axios.post("http://localhost:8800/products", { id: e });
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

async function removeProducts(e) {
  try {
    console.log(e);
    const response = await axios.post("http://localhost:8800/removeProduct", { e });
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


/**
 * Represents a shopping cart component.
 *
 * @component
 * @returns {JSX.Element} The ShoppingCart component.
 */
const Cart = () => {
  // State variables
  const [user, setUser] = useState(""); // [1]
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  /**
   * Adds a product to the cart.
   *
   * @param {Object} product - The product to be added.
   */
  const addItem = (product) => {
    if (product === undefined) return;

    if (cart.find((item) => item.id === product.id)) {
      return;
    }
    setCart((cart) => [...cart, { ...product, quantity: product.quantity }]);
  };

  useEffect(() => {
    axios.get('http://localhost:8800/auth', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          fetch(res.data.userId);
          setUser(res.data.userId);
        } else {
          console.log("Error fetching user:", res.data.Message);
        }
      })
    
  }, []);


  /**
   * Fetches cart data from the server and updates the products state.
   */
  const fetch = async (userID) => {
    
  
    console.log(userID);
    const importData = await getCart(userID);
    console.log(importData);
    const updatedProducts = await Promise.all(
      importData.map(async (item) => {
        const tempProduct = await getProducts(item.productID);
        //console.log(tempProduct,"tempProduct");
        const tempCat = await getCat(tempProduct[0].productRelation);
        return {
          id: item.idCart,
          quantity: item.quantity,
          name: tempProduct[0].name,
          price: tempProduct[0].price,
          image: tempProduct[0].image,
          PID: tempProduct[0].idProduct,
          size: tempProduct[0].size,
          sex: tempProduct[0].sex,
          stock: tempProduct[0].stock,
          brand: tempCat[0].brand
        };
      })
    );
    setProducts(updatedProducts);
  };

  const handleClick = () => {
    navigate("/order");
  };
  

  // Add products to cart on products state change
  useEffect(() => {
    products.forEach((product) => addItem(product));
  }, [products]);

  /**
   * Decreases the quantity of a product in the cart.
   *
   * @param {Object} product - The product to decrease the quantity of.
   */
  const decreaseQuantity = async (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    const jsonData = {
      PID: product.PID,
      userID: user,
      all: "1"
    };
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        await removeProducts(jsonData);
        updatedCart.splice(existingProductIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  /**
   * Increases the quantity of a product in the cart.
   *
   * @param {Object} product - The product to increase the quantity of.
   */
  const increaseQuantity = (product) => {
    if (product.stock > product.quantity) {
      const updatedCart = [...cart];
      const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      console.log("No more stock");
      return;
    }
  };

  /**
   * Calculates the total cost of all products in the cart.
   *
   * @returns {number} The total cost.
   */
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  


  return (
    <div className='cart-body'>
      
      <div className="cart-form-container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-form">



          {cart.length === 0 ? (
            <div className="cart-empty-text">
              <p>Your cart is empty.</p>
              <p>
                <BsCartX size={50} />
              </p>
            </div>
          ) : (
            <div>
              <div className="cart-cost">
                <p className="cart-cost-text">Total: ${calculateTotal()}</p>
                <button className='cart-button' onClick={handleClick}>Checkout</button>
              </div>
              {cart.length > 0 && (
                <ul className="cart-list">
                  {cart.map((item) => (
                    <li className="cart-product" key={item.id}>
                      <div className="image-form">
                        <img
                          src={products.find((product) => product.id === item.id).image}
                          alt={item.name}
                          style={{ width: "140px", height: "140px" }}
                        />
                      </div>
                      <div className="info-form">
                        <h3>{item.name}</h3>
                        <div className="info-form">
                          <p className="cart-prodinfo">Price: {item.price} €</p>
                          <p className="cart-prodinfo">PID: {item.PID}</p>
                          <p className="cart-prodinfo">Size: {item.size}</p>
                          <p className="cart-prodinfo">Sex: {item.sex}</p>
                          <p className="cart-prodinfo">Brand: {item.brand} </p>
                        </div>
                      </div>
                      <div className="button-form">
                        <button className="image-form" onClick={() => increaseQuantity(item)}>
                          <IoIosAddCircleOutline size={22} />
                        </button>
                        <p fontSize="10px" className="cart-Counter">
                          {" "}
                          {item.quantity}
                        </p>
                        <button className="image-form" onClick={() => decreaseQuantity(item)}>
                          <IoIosRemoveCircleOutline size={22} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

            </div>

          )}
        </div>
      </div>
    </div>
  );
};





export default Cart;
