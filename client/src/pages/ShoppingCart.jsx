import React, { useEffect, useState } from 'react';
import '../stylesheets/shoppingCart.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { BsCartX } from "react-icons/bs";
import axios from 'axios';

async function getCart()  {
  try {
    const response = await axios.get("http://localhost:8800/cart");
    console.log(JSON.parse(JSON.stringify(response.data)));
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

async function getProducts(e) {
  try {
    const response = await axios.post("http://localhost:8800/products",{id:e});
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


const ShoppingCart = () => {
  
  const [cart, setCart] = useState([]);
  const [products,setProducts] = useState([]);

  const addItem = (product) => {
    if(product === undefined) return;

    if(cart.find(item => item.id === product.id)) {
      return;
    }
    setCart(cart => [...cart, { ...product, quantity: product.quantity}]);
  };

    
 
  
  const fetch = async () => {
    const importData = await getCart();
    const updatedProducts = await Promise.all(importData.map(async (item) => {
      const tempProduct = await getProducts(item.product_idProduct);
      return {
        id: item.idCart,
        quantity: item.quantity,
        name: tempProduct[0].name,
        price: tempProduct[0].price,
        image: tempProduct[0].image,
        PID: tempProduct[0].idProduct,
        size: tempProduct[0].size,
        sex: tempProduct[0].sex,
        stock: tempProduct[0].stock

      };
    }));
    setProducts(updatedProducts);
  };
  
  
  useEffect(() => {addItem()},[products]);
  useEffect(() => {fetch()}, []);
  useEffect(() => {
    products.forEach(product => addItem(product));
  }, [products]);
  
  
  
 
  

  
 

  
  

  const decreaseQuantity = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        // add filter instead
       // updatedCart.filter(item => item.id !== product.id);
        updatedCart.splice(existingProductIndex, 1); // ska inte splica hitta nytt sätt
      }
      setCart(updatedCart);
    }
  };

  const increaseQuantity = (product) => {
    if(product.stock > product.quantity){
      const updatedCart = [...cart];
      const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    }
    else{
      console.log("No more stock");
      return;
    }
    
  };

 

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

 
  return (
      <div className="cart-form-container">
        <h1 className='cart-title'>Shopping Cart</h1>

        <div className="cart-form">
          {cart.length === 0 ? (
            <div className='cart-empty-text'>
              <p>Your cart is empty. 
                
              </p>
              <p><BsCartX size={50} /></p>
            </div>
          ) : (
            <div>
              {cart.length > 0 && (
                <ul className='cart-list'>
                  {cart.map((item) => (
                    <li className='cart-product' key={item.id}>
                      <div className='image-form'>
                        {/* <img src={products.find(product => product.id === item.id).image} alt={item.name} style={{ width: '140px', height: '140px' }} /> */}
                      </div>
                      <div className='info-form'>
                        <h3>{item.name}</h3>
                        <div className='info-form'>
                          <p className='cart-prodinfo'>Price: {item.price} €</p>
                          <p className='cart-prodinfo'>PID: {item.PID}</p>
                          <p className='cart-prodinfo'>Size: {item.size}</p>
                          <p className='cart-prodinfo'>Sex: {item.sex}</p>
                          <p className='cart-prodinfo'>Brand: Nike </p>
                        </div>
                      </div>  
                      <div className='button-form'>
                        <button className='image-form'onClick={() => increaseQuantity(item)}><IoIosAddCircleOutline size={22} /></button>
                        <p fontSize= '10px' className='cart-Counter'> {item.quantity}</p>
                        <button className='image-form' onClick={() => decreaseQuantity(item)}><IoIosRemoveCircleOutline size={22}/></button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <p className='cart-cost-text'>Total: ${calculateTotal()}</p>
            </div>
          )}
          </div>

        </div>
      
    );
};





export default ShoppingCart;
