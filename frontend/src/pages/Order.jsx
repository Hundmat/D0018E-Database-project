import React, {useEffect, useState } from 'react';
import '../stylesheets/order.css';
import axios from 'axios';


async function postOrder(formData) {
  try {
    await axios.post("http://localhost:8800/order", formData);
    return 200;
  } catch (error) {
    console.error("Error posting order:", error);
    return [];
  }
}

async function getCart(userID) {
  try {
    const response = await axios.post("http://localhost:8800/cart", {userID});
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
}

async function updateOrder(formCart,orderID) {
  try {
    const response = await axios.post("http://localhost:8800/orderProducts", formCart,orderID);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
}

const Order = () => {
  const [formData, setFormData] = useState({
    userID: '1',
    orderID: '',
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

  const [formCart, setFormCart] = useState([]);

  useEffect(() => {
    fetchCart("user1");
  }, []);

  const fetchCart = async (userID) => {
    try {
      const response = await getCart(userID);
      const orderID = Math.floor(Math.random() * 1000000000); // Generate orderID
      const updatedFormCart = response.map(cartItem => ({
        orderID: orderID,
        quantity: cartItem.quantity,
        productID: cartItem.productID,
        price: "100"
      }));
      setFormData(prevState => ({
        ...prevState,
        orderID: orderID // Set the same orderID in formData
      }));
      setFormCart(updatedFormCart);
      return response;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    await postOrder(formData);
    try {
      console.log(formCart);
      await updateOrder(formCart);
      setFormData({
        userID: '',
        orderID: '',
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
      setFormCart([]);
      alert('Order submitted successfully');
    } catch (error){
      alert('Failed to submit order');
    }
  };


  return (
    <div className='order-body'>
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
