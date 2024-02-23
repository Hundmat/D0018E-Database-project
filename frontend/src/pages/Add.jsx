import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../stylesheets/add.css"





const Add = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        prodDescription: "",
        sex: "",
        size: "",
        stock: 100,
        productRelation: "", // Add the missing input
        idProduct: ""
    });
    
    const [category, setCategory] = useState({
        nameCat: "",
        brand: "",
        typeCat: "",
        productRelation: ""
    });
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log(await axios.post("http://localhost:8800/newProduct", product));
            console.log(await axios.post("http://localhost:8800/newCat", category));
            console.log(category)
            
            navigate("/product");
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "productRelation") {
            setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangeCat = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    
    return (
        
        <div className="form-container">
            <div className="form">
                <h1>Add new product</h1>
                <input
                    type="text"
                    placeholder="article number"
                    onChange={handleChange}
                    name="idProduct"
                />
                <input
                    type="text"
                    placeholder="brand"
                    onChange={handleChangeCat}
                    name="brand"
                />
                <input
                    type="text"
                    placeholder="name"
                    onChange={handleChange}
                    name="name"
                />
                <textarea
                    type="text"
                    placeholder="description"
                    onChange={handleChange}
                    name="desc"
                    id="desc"
                />
                <input
                    type="number"
                    placeholder="price"
                    onChange={handleChange}
                    name="price"
                />
                <input
                    type="text"
                    placeholder="size"
                    onChange={handleChange}
                    name="size"
                />
                <input
                    type="text"
                    placeholder="image"
                    onChange={handleChange}
                    name="image"
                />
                <input 
                    type="text" 
                    placeholder="sex" 
                    onChange={handleChange} 
                    name="sex" 
                />
                <input 
                    type="text" 
                    placeholder="nameCat" 
                    onChange={handleChangeCat} 
                    name="nameCat" 
                />
                <input 
                    type="text" 
                    placeholder="typeCat" 
                    onChange={handleChangeCat} 
                    name="typeCat" 
                />
                <input 
                    type="text" 
                    placeholder="productRelation" 
                    onChange={handleChange} 
                    name="productRelation" 
                />
                <button className="addButton" onClick={handleClick}>Add</button>
            </div>
           
        </div>
        
    );
};

export default Add;