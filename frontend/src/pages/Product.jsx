import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

import "../stylesheets/product.css";

import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import '../stylesheets/navbar.css';
import '../stylesheets/footer.css';


const Product = ({pid, id}) => {

    const location = useLocation();

    const navigate = useNavigate();

    const handleClick = async e => {  
        e.preventDefault();
        try {
            await navigate(`/browse`);
        } catch (err) {
            console.log(err);
        }
    };

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/product/${location.state.pid}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProduct();

    }, [location])

    return (
        <div>
            <Navbar/>
            <div className="productPage">
                <button className="browseButton" onClick={handleClick}>
                    Browse
                </button>
                {product.map((p) => (
                    <div className="product" key={p.idProduct}>
                        <div className="product-image">  
                            {p.image && <img src={p.image} alt=''/>}
                        </div>
                        <div className="product-info">
                            <h2>{p.name}</h2>
                            <h3>SEK {p.price}</h3>
                            <h4>{p.size}</h4>
                            <h4>{p.sex}</h4>
                            <p>{p.prodDescription}</p>
                            <h4>Stock: {p.stock}</h4>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
         </div>
    );
}

export default Product;
