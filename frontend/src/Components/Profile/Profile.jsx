import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios

const Profile = () => {
    const [userId, setUserId] = useState(""); // assuming you have a way to get the userId
    const [cartData, setCartData] = useState([]);
    const [tableName, setTableName] = useState(""); // to store the tableName

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
                        const orderId = res.data[0].idOrder; // Extracting idOrder from the first element of the array
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
        if (tableName) {
            axios.get(`http://localhost:8800/getOrders?tableName=${tableName}`)
                .then(res => {
                    setCartData(res.data);
                    console.log(res.data);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
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
            <h1>{tableName}</h1>
        </div>
    );
};

export default Profile;