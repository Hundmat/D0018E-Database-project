import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios

const Profile = () => {
    const [userId, setUserId] = useState(""); // assuming you have a way to get the userId
    const [cartData, setCartData] = useState([]);
    const [tableName, setTableName] = useState([]); // to store the tableName

    useEffect(() => {
        axios.get('http://localhost:8800/auth', { withCredentials: true })
            .then(res => {
                if (res.data.Status === "Success") {
                    setUserId(res.data.userId);
                } else {
                    console.log("error")
                }
            });
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8800/getOrder?userID=${userId}`)
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        const orderId = res.data.map(order => order.idOrder); 
                        setTableName(orderId);
                        console.log("Table name:", orderId);
                    } else {
                        console.error("No order found for user:", userId);
                    }
                })
                .catch(error => {
                    console.error('Error fetching order:', error);
                });
        }
    }, [userId]);
    

    useEffect(() => {
        if (tableName.length > 0) {
            const fetchOrders = async () => {
                try {
                    const promises = tableName.map(tableName =>
                        axios.get(`http://localhost:8800/getOrders?tableName=${tableName}`)
                    );
                    const responses = await Promise.all(promises);
                    const orders = responses.map(response => response.data);
                    setCartData(orders.flat());
                    console.log("Orders:", orders);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
            fetchOrders();
        }
    }, [tableName]);

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartData.map(item => (
                    <li key={item.idOrder}>
                        <p>{item.productID}</p>
                        <p>{item.quantity}</p>
                        <p>{item.price}</p>

                        
                    </li>
                    
                ))}
            </ul>
            <h1>{userId}</h1>
            <h1>{tableName}</h1>
        </div>
    );
};

export default Profile;