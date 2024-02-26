import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylesheets/order.css';
import { useNavigate } from "react-router-dom";


async function getProducts(e) {
  try {
    const response = await axios.post("http://localhost:8800/products", { id: e });
    
    return response.data[0].price;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

async function postOrder(formData) {
  try {
    await axios.post("http://localhost:8800/order", formData);
    return 200;
  } catch (error) {
    console.error("Error posting order:", error);
    return [];
  }
}

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

async function updateStock(stock) {
  console.log(stock);
  try {
    await axios.post("http://localhost:8800/updateStock", stock);
    return 200;
  } catch (error) {
    console.error("Error updating stock:", error);
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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const [formCart, setFormCart] = useState([]);

  useEffect(() => {
    console.log("Fetching user");
    axios.get('http://localhost:8800/auth', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          fetchCart(res.data.userId);
          setFormData(prevState => ({
            ...prevState,
            userID: res.data.userId // Set the same orderID in formData
          }));
        } else {
          console.log("Error fetching user:", res.data.Message);
        }
      })
  }, [])
    


  const fetchCart = async (userID) => {
    try {
      const response = await getCart(userID);

      const orderID = Math.floor(Math.random() * 1000000000); // Generate orderID

      const updatedFormCart = await Promise.all(response.map(async (cartItem) => {
          const price = await getProducts(cartItem.productID);
          return {
              orderID: orderID,
              quantity: cartItem.quantity,
              productID: cartItem.productID,
              price: price
          };
      }));
      console.log(updatedFormCart);

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

  const calculateTotal = () => {
    return formCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    await postOrder(formData);
    try {
      await updateOrder(formCart);
      
      formCart.forEach(async (item) => {
        const stock = {
          idProduct: item.productID,
          removeAmount: item.quantity
        };
        updateStock(stock);
      });

      const jsonData = {
        PID: "null",
        userID: formData.userID,

      };
      removeProducts(jsonData);

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
      navigate("/home");


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
              <input className="order-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
              <p className='order-name'>Shipping Address</p>
              <input className="order-input" type="text" name="address" value={formData.address} onChange={handleChange} required />
              <p className='order-name'>City</p>
              <input className="order-input" type="text" name="city" value={formData.city} onChange={handleChange} required />
              <p className='order-name'>Country</p>
              <input className="order-input" type="text" name="country" value={formData.country} onChange={handleChange} required />
              <p className='order-name'>ZIP Code</p>
              <input className="order-input" type="text" name="zip" value={formData.zip} onChange={handleChange} required />
              <p className='order-name'>Card Number</p>
              <input className="order-input" type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
              <p className='order-name'>Expiry Date</p>
              <input className="order-input" type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
              <p className='order-name'>CVV</p>
              <input className="order-input" type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
              <button className='order-button-save' type="submit">Order</button>

            </form>

          </div>
          <div className='order-right'>
            <h1 className='order-sum'>Order Summary</h1>
            <div className='order-right-inner'>
              <div className='order-line'></div>
              <h4 className="order-order">Order value: ${calculateTotal()}</h4>
              <h4 className="order-order">Delivery Cost: $ 3</h4>
              <div className='order-line'></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Order;
