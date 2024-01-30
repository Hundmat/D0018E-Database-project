import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { route } from 'react-router-dom';

import "../stylesheets/product.css"


const Product = () => {

    const {id} = route.params;

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/product/${id.id}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProduct();

    }, [])

    return (
        <div className="productPage">
            {product.map((p) => (
                <div className="product" key={p.idProduct}>  
                    <h2>{p.name}</h2>
                    {p.image && <img src={p.image} alt=''/>}
                    <h3>SEK {p.price}</h3>
                    <h4>{p.size}</h4>
                    <h4>{p.sex}</h4>
                    <p>{p.prodDescription}</p>
                    <h4>{p.stock}</h4>
                </div>
            ))}
         </div>
    );
}

export default Product;
