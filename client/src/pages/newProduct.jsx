import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";




import "../stylesheets/add.module.css"

const Add = () => {
    const [product, setProduct] = useState({
        name: "",
        price: 399,
        image: "",
        prodDescription: "",
        sex: "",
        size: "",
        stock: 100,
        productRelation: "" // Add the missing input
    });
    
    const [category, setCategory] = useState({
        nameCat: "",
        brand: "",
        typeCat: ""
    });
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/newProduct", product);
            await axios.post("http://localhost:8800/newCat", category);
            navigate("/newProduct");
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangeCat = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    

    console.log(product);
    
    return (
        
        <div className="form-container">
            
            <div className="form">
                <h1>Add new product</h1>

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
                <button onClick={handleClick}>Add</button>
            </div>
           
        </div>
        
    );
};

export default Add;