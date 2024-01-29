import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Products = () => {

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

    return (
        <div>
            <h1>All products</h1>
            <div className="products">
                {products.map((product) => (
                    <div className="product" key={product.pid}>
                        {product.image && <img src={product.image} alt=''/>}
                        <h2>{product.brand}</h2>
                        <h2>{product.name}</h2>
                        <h3>SEK {product.price}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
