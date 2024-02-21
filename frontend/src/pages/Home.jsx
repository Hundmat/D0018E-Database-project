import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

import '../stylesheets/home.css'


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
        <div className='body'>
            <div className="home-allt">
                <div className="home-container">
                    <h1>SPORTSHOP DELUXE</h1>

                    <div className="recommended-products">
                        {products.map((product) => (
                            <div className="home-product" key={product.idProduct}>
                                {product.image && <img src={product.image} alt="" />}
                                <h2>{product.name}</h2>
                                <p>{product.prodDescription}</p>
                                <span>{product.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home