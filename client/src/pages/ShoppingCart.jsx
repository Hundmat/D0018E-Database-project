import React, { useState } from 'react';
import '../stylesheets/shoppingCart.css';
import test from '../testbild.png';
const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Product 1', price: 20, image: test },
    { id: 2, name: 'Product 2', price: 30, image: 'product2.jpg' },
    // Add more products as needed
  ];

  const addItem = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingProductIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const increaseQuantity = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);
    updatedCart[existingProductIndex].quantity += 1;
    setCart(updatedCart);
  };

 

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li className='form' key={item.id}>
                <div>
                  <img src={products.find(product => product.id === item.id).image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                  
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  
                </div>
                <div>
                    <button onClick={() => increaseQuantity(item)}>+</button>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => decreaseQuantity(item)}>-</button>
                </div>
                
              </li>
            ))}
          </ul>
          <p>Total: ${calculateTotal()}</p>
        </div>
      )}

      <h3>Product List</h3>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addItem(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
