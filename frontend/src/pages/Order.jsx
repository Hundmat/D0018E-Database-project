import React, {useEffect, useState } from 'react';
import '../stylesheets/order.css';
import axios from 'axios';

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../stylesheets/navbar.css";
import "../stylesheets/footer.css";

async function postOrder(e) {
  try {
    const response = await axios.post("http://localhost:8800/order",{e});
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
//get active user
//get user cart
//uppdate order with user cart
const Order = () =>  {
  const [formData, setFormData] = useState({
    userID: '1',
    orderID: '12344',
    productID: '1000',
    quantity: '1',
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    alert('Form submitted');
    console.log('Form submitted');
    e.preventDefault();

    const fetch = async () => {
      const response = await postOrder(formData);
      console.log(response);
    }
    
    fetch();
    
    // Add logic for handling form submission (e.g., sending data to server)
    console.log(formData);
    // Reset form data after submission
    setFormData({
      fullName: '',
      email: '',
      address: '',
      city: '',
      country: '',
      zip: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
  };

  return (
    <div className='order-body'>
      <Navbar />
        <div className='order-middle'>
            <h1 className='order-checkout'>Checkout</h1>
            <div className='order-center'>
                
                <div className='order-left'>
                  <h1 className='order-sum'>Information</h1>
                    <form className="order-form" onSubmit={handleSubmit}>
                        <p className='order-name'>Full Name</p>
                        <input className="order-input" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        <p className='order-name'>Email</p>
                        <input className="order-input" type="email" name="email" value={formData.email} onChange={handleChange}  required />
                        <p className='order-name'>Shipping Address</p>
                        <input className="order-input" type="text" name="address" value={formData.address} onChange={handleChange}  required />
                        <p className='order-name'>City</p>
                        <input className="order-input" type="text" name="city" value={formData.city} onChange={handleChange}  required />
                        <p className='order-name'>Country</p>
                        <input className="order-input" type="text" name="country" value={formData.country} onChange={handleChange}  required />
                        <p className='order-name'>ZIP Code</p>
                        <input className="order-input" type="text" name="zip" value={formData.zip} onChange={handleChange}  required />
                        <p className='order-name'>Card Number</p>
                        <input className="order-input" type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                        <p className='order-name'>Expiry Date</p>
                        <input className="order-input" type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange}  required />
                        <p className='order-name'>CVV</p>
                        <input className="order-input" type="text" name="cvv" value={formData.cvv} onChange={handleChange}  required />
                        <button className='order-button-save' type="submit">Order</button>

                    </form>

                </div>
                <div className='order-right'> 
                  <h1 className='order-sum'>Order Summary</h1>
                    <div className='order-right-inner'>  
                      <div className='order-line'></div>
                      <h4 className= "order-order">Order value: 1000 kr</h4>
                      <h4 className= "order-order">Delivery Cost: 29.00 kr</h4>
                      <div className='order-line'></div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  );
}

export default Order;
