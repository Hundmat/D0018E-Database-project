import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

import '../stylesheets/home.css'


const Home = () => {
    const [products, setProducts] = useState([])
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState("")
    const [userId, setUserID] = useState("")
    const [message, setMessage] = useState("")

    // useEffect(() => {
    //     const fetchAllProducts = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:8800/product")
    //             setProducts(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchAllProducts()
    // }, [])

    useEffect(() => {
        axios.get('http://localhost:8800/auth', { withCredentials: true })
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    //setName(res.data.email)
                    setName(res.data.name)
                    setUserID(res.data.userId)
                } else {
                    setMessage(res.data.Message)
                }
            })
    }, [])

    return (
        <div className='body'>

            <div className="home-allt">
                <div className="home-container">
                    <h1>SPORTSHOP DELUXE</h1>
                    <div className='home-loginMessage'>
                        {
                            auth ?
                                <div>
                                    <h3>Welcome Back {name} with userId {userId}</h3>
                                </div>
                                :
                                <div>
                                    <h3>{message}</h3>
                                    <h3>Login Now</h3>
                                    <Link to="/signup">
                                        <button className='home-loginbtn'>Signup</button>
                                    </Link>
                                </div>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home