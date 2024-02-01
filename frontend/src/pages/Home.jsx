import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import '../stylesheets/Homepage.css'

import '../stylesheets/Navbar.css';
import '../stylesheets/Footer.css';
const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/product")
                setProducts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [])

    return (
        <div >
            <Navbar />
            <div className="home-allt">
                <div className="home-container">
                    <h1>SPORTSHOP DELUXE</h1>

                    <div className="recommended-products">
                        {products.map((product) => (
                            <div className="product" key={product.idProduct}>
                                {product.image && <img src={product.image} alt="" />}
                                <h2>{product.name}</h2>
                                <p>{product.prodDescription}</p>
                                <span>{product.price}</span>
                            </div>
                        ))}
                    </div>

                    <button className="add-button">
                        <Link to="/add">New product</Link>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home