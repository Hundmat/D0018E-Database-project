import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';

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
        <div className='browse-container'>
            <h1>All products</h1>
            <button className="browse-linkButton">
                <Link to="/add">Add product</Link>
            </button>
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
    );
}

export default Browse;
