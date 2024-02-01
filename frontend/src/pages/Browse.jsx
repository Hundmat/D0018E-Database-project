import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';

import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import '../stylesheets/navbar.css';
import '../stylesheets/footer.css';

import "../stylesheets/browse.css";

const Browse = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/browse");
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllProducts();

    }, [])

    const navigate = useNavigate();

    const handleClick = id => async e => {  
        e.preventDefault();
        try {
            await navigate(`/product`, {state: {pid: id}});
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className='browse-container'>
                <div className="browse-products">
                    {products.map((product) => (
                        <div className="browse-product" onClick={handleClick(product.idProduct)} key={product.idProduct}>
                            {product.image && <img src={product.image} alt=''/>}
                            <h2>{product.name}</h2>
                            <h3>SEK {product.price}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Browse;
